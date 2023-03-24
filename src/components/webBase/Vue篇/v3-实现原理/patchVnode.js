/*
 * @Descripttion:
 * @Author: ZhangYu
 * @Date: 2023-03-06 10:39:08
 * @LastEditors: ZhangYu
 * @LastEditTime: 2023-03-23 17:26:22
 * 注意： 默认新node 存在 text 和 children 为 互斥条件
 */

import { isDef } from './utils'
import createElement from './createElement'
import updateChildren from './updateChildren'
import { sameNode } from './utils'

/**
 * 比对两个‘相同’的新旧节点
 * 1. 新节点 text属性 和 children属性 为互斥条件
 * 2. 如果新节点有text属性，分两种情况
 *     - 如果新旧节点text属性相同，不处理
 *     - 如果不同设置text属性为新节点的
 * 3. 如果新节点有children属性，分
 *     - 新旧节点都有children
 *     - 只有新节点有children
 *     - 只有旧节点有children
 *     - 都没有children
 * @param {*} oldVnode 旧节点
 * @param {*} newVnode 新节点
 * @returns
 */
export default function patchVnode (oldVnode, newVnode) {
  // 先将newVnode.elm设置为oldVnode.elm
  const elm = (newVnode.elm = oldVnode.elm)

  // 如果两个新旧节点完全一样，则不需要比较
  if (oldVnode === newVnode) return
  // 如果新节点有text
  if (isDef(newVnode.text)) {
    // 如果新节点text和老节点一样
    if (newVnode.text === oldVnode.text) {
      return
    } else {
      // elm 设置为新的text
      // textContent 文本内容 撑出元素才会触发回流
      // innerText 包含标签和样式，一定触发回流
      elm.textContent = newVnode.text
    }
  } else {
    const oldCh = oldVnode.children
    const newCh = newVnode.children
    if (isDef(oldCh) && isDef(newCh)) {
      if (oldCh !== newCh) {
        // 两个都有child，较为复杂，核心。
        updateChildren(elm, oldCh, newCh)
      }
    } else if (isDef(newCh)) {
      // 如果旧节点有text，则将旧节点的text置空
      if (isDef(oldVnode.text)) {
        elm.textContent = ''
      }
      // 将新节点的children添加到elm上
      for (let i = 0; i < newCh.length; i++) {
        const childEl = createElement(newCh[i])
        elm.appendChild(childEl)
      }
    } else if (isDef(oldCh)) {
      // 将老节点的children移除
      for (let i = 0; i < oldCh.length; i++) {
        const childEl = oldCh.elm
        if (isDef(childEl)) {
          childEl.parentNode && childEl.parentNode.removeChild(oldCh.elm)
        }
      }
    } else if (oldVnode.text) {
      // 最后再判断下老节点是否有text
      elm.textContent = ''
    }
  }
}
