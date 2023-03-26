/*
 * @Descripttion: 模板编译类
 * @Author: ZhangYu
 * @Date: 2023-03-26 12:24:38
 * @LastEditors: ZhangYu
 * @LastEditTime: 2023-03-26 20:28:04
 */
import Watcher from "../observer/watcher"
export default function compile (domSal, vm) {
  vm.$el = document.querySelector(domSal)
  let fragment = document.createDocumentFragment()
  let child
  while (child = vm.$el.firstChild) {
    fragment.append(child)
  }
  _nodeCompile(fragment, vm)
  vm.$el.appendChild(fragment)
}

// 编译节点
function _nodeCompile (node, vm) {
  if (node.nodeType === 3) {
    compileText(node, vm)
  }
  if (node.nodeType === 1 && node.nodeName === 'INPUT') {
    complieElement(node, vm)
  }
  for (let i = 0; i < node.childNodes.length; i++) {
    let child = node.childNodes[i]
    _nodeCompile(child, vm)
  }
}

// 编译文本节点
function compileText (node, vm) {
  const patternText = /\{\{\s*(\S+)\s*\}\}/
  const pRes = patternText.exec(node.nodeValue)
  let nodeValue = node.nodeValue
  if (pRes) {
    const exp = pRes[1]
    const value = exp.split('.').reduce((pre, cur) => {
      return pre[cur]
    }, vm.$data)
    node.nodeValue = nodeValue.replace(patternText, value)
    new Watcher (vm, exp, (newValue) => {
      node.nodeValue = nodeValue.replace(patternText, newValue)
    })
  }
}

// 编译元素节点
function complieElement (node, vm) {
  const attrs = Array.from(node.attributes)
  for (let i = 0; i < attrs.length; i++) {
    const attr = attrs[i]
    if (attr.nodeName === 'v-model') {
      let exp = attr.nodeValue
      const value = exp.split('.').reduce((pre, cur) => pre[cur], vm.$data)
      node.value = value
      new Watcher(vm, exp, (newValue) => {
        node.value = newValue
      })
      node.addEventListener('input', function (e) {
        exp = attr.nodeValue
        if (!exp) return
        const arr = exp.split('.')
        let trueKey = arr.splice(arr.length - 1, 1)
        let preValue = arr.reduce((pre, cur) => pre[cur], vm.$data)
        preValue[trueKey] = e.target.value
      })
    }
  }
}