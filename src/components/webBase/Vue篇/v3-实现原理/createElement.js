/**
 * @author ZhangYu
 * @create date 2023-03-05 17:05:58
 * @modify date 2023-03-23 00:32:26
 * @desc createElement函数，将vNode转为真实DOM
 */
import { isDef, isUndef } from "./utils"

/**
 * 将虚拟节点转化为真实DOM
 * @param {*} vNode 虚拟节点
 * @returns {Document}
 */
export default function createElement (vNode) {
  let elm = document.createElement(vNode.sel)
  // vNode是文本节点
  if (isDef(vNode.text) && (isUndef(vNode.children) || vNode.children.length === 0)) {
    elm.textContent = vNode.text
  } else if (Array.isArray(vNode.children) && vNode.children.length) {
    // 比例children添加子节点
    for (let i = 0; i < vNode.children.length; i++) {
      const childElm = createElement(vNode.children[i])
      elm.appendChild(childElm)
    }
  }
  vNode.elm = elm
  return vNode.elm
}
