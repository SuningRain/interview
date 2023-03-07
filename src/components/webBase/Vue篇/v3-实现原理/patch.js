/**
 * @author ZhangYu
 * @create date 2023-03-05 16:34:48
 * @desc path函数
 */

import vNode from './vnode'
import createElement from './createElement'
import patchNode from './patchVnode'
import { sameNode } from './utils'

// 是否为vNode对象
function isVnode (data) {
  return !!data.sel
}


/**
 * 比对新旧节点
 * @param {*} oldVnode 新节点
 * @param {*} newVnode 旧节点
 */
export default function patch (oldVnode, newVnode) {
  // 如果oldVnode不是vNode对象,说明此时是Element元素
  if (!isVnode(oldVnode)) {
    // 将Element转化为vNode
    vNode(oldVnode.tagName.toLowercase(), {}, null, undefined, null)
  }
  // 节点相同
  if (sameNode(oldVnode, newVnode)) {
    patchNode(oldVnode, newVnode)
  } else {
    // 节点不同，插入新的节点，删除旧的节点
    const newVnodeElm = createElement(newVnode)
    if (oldVnode.elm.parentNode && newVnodeElm) {
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
    }
    oldVnode.elm.parentNode.removeChild(oldVnode.elm)
  }
}
