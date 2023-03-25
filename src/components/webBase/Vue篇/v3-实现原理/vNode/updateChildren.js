/**
 * @author ZhangYu
 * @create date 2023-03-06 17:17:05
 * @modify date 2023-03-25 14:03:02
 * @desc 比较两组children
 */
import { isDef, isUndef, sameNode } from "./utils"
import patchVnode from "./patchVnode"
import createElement from "./createElement"

/**
 * 采用 t1-新前旧前  t2-新后旧后  t3-新后旧前  t4-新前旧后 的比较算法 循环遍历
 * 1. 满足t3的情况，插入真实DOM到oldEndIndex后面
 * 2. 满足t4的情况，插入真实DOM到oldStartIndex前面
 *
 * 如果四种条件都不满足，则在oldCh中寻找与newVnode匹配的节点
 * - 如果找到了，插入到真实DOM中对应位置，并且oldVnode节点置为undefined
 * - 如果没找到，不处理
 * - newStartIndex加一
 *
 * 循环结束后
 * 1. newStartIndex <= newEndIndex 说明 新节点有多的节点要插入
 * 2. oldStartIndex <= oldEndIndex 说明 旧节点有多的节点要删除
 * @param {*} parentNode 父节点
 * @param {*} oldChl 旧的children
 * @param {*} newChl 新的children
 */
export default function updateChildren (parentNode, oldChl, newChl) {
  let oldStartIndex = 0
  let oldStartVnode = oldChl[oldStartIndex]
  let oldEndIndex = oldChl.length - 1
  let oldEndVnode = oldChl[oldEndIndex]

  let newStartIndex = 0
  let newStartVnode = newChl[newStartIndex]
  let newEndIndex = newChl.length - 1
  let newEndVnode = newChl[newEndIndex]

  let keyToOldIndexMap, indexToOld

  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    // 处理oldVnode为空情况，如果为空，去对应的下一个位置
    if (isUndef(oldStartVnode)) {
      oldStartVnode = oldChl[++oldStartIndex]
    } else if (isUndef(oldEndVnode)) {
      oldEndVnode = oldChl[--oldEndIndex]
      // 分四种情况比较
      // 新前旧前
    } else if (sameNode(newStartVnode, oldStartVnode)) {
      patchVnode(oldStartVnode, newStartVnode)
      newStartVnode = newChl[++newStartIndex]
      oldStartVnode = oldChl[++oldStartIndex]
      // 新后旧后
    } else if (sameNode(newEndVnode, oldEndVnode)) {
      patchVnode(oldEndVnode, newEndVnode)
      newEndVnode = newChl[--newEndIndex]
      oldEndVnode = oldChl[--oldEndIndex]
      // 新后旧前
    } else if (sameNode(newEndVnode, oldStartVnode)) {
      patchVnode(oldStartVnode, newEndVnode)
      parentNode.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibiling)
      newEndVnode = newChl[--newEndIndex]
      oldStartVnode = oldChl[++oldStartIndex]
      // 新前旧后
    } else if (sameNode(newStartVnode, oldEndVnode)) {
      patchVnode(oldEndVnode, newStartVnode)
      parentNode.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
      newStartVnode = newChl[++newStartIndex]
      oldEndVnode = oldChl[--oldEndIndex]
    } else {
      // 创建一次 oldCh 的 key index 映射
      if (isUndef(keyToOldIndexMap)) {
        keyToOldIndexMap = _createKeyToOldIndex(oldChl, oldStartIndex, oldEndIndex)
      }
      // 如果定义了key，则从map中取，没有则遍历oldChl查找
      indexToOld = isDef(newStartVnode.key)
        ? keyToOldIndexMap[newStartVnode.key]
        : _findIndexInOld(newStartVnode)

      // 找到了index
      if (isDef(indexToOld)) {
        const oldVNodeToMove = oldChl[indexToOld]
        patchVnode(oldVNodeToMove, newStartVnode)
        // 如果是相同节点，则进行移动
        if (sameNode(oldVNodeToMove, newStartVnode)) {
          patchVnode(oldVNodeToMove, newStartVnode)
          parentNode.insertBefore(oldVNodeToMove.elm, oldStartVnode.elm)
          oldChl[indexToOld] = undefined
        } else {
          // 如果不是相同节点，这种情况可能是key相同，但是tag不同，创建并插入
          parentNode.insertBefore(createElement(newChl[newStartIndex]), oldStartVnode.elm)
        }
      } else {
        // 如果没有找到index，说明newStartVnode是全新的，需要创建并插入
        parentNode.insertBefore(createElement(newChl[newStartIndex]), oldStartVnode.elm)
      }
      newStartVnode = newChl[++newStartIndex]
    }
  }
  // 如果新节点还有多余的节点未处理 则将多的节点插入到DOM中
  if (newStartIndex <= newEndIndex) {
    // 在该基准节点前插入, 以newCH中的位置为准
    const refElm = isDef(newChl[newEndIndex + 1]) ? null : newChl[newEndIndex + 1]
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      // 新的多的vNode 没有进行patchVnode 此时还没有elm，需要调用newChl
      parentNode.insertBefore(createElement(newChl[i]), refElm)
    }
  // 有多余的节点，将DOM中移除
  } else if (oldStartIndex <= oldEndIndex) {
    // 遍历oldCh删除
    for (let i = oldStartIndex; i <= oldEndIndex; i++) {
      parentNode.removeChild(oldChl[i].elm)
    }
  }
}

/**
 * 创建 key 和 index的映射关系
 * @param {*} children 节点列表
 * @param {*} startIndex 开始位置
 * @param {*} endIndex 结束位置
 */
function _createKeyToOldIndex (children, startIndex, endIndex) {
  // 将临时变量定义在for循环外部，减少内存消耗
  let i, key
  const map = {}
  for (let i = startIndex; i <= endIndex; i++) {
    key = children[i].key
    if (isDef(key)) {
      map[key] = i
    }
  }
  return map
}

/**
 * 从oldChl中查找和newStartVnode匹配的节点
 * @param {*} newStartVnode
 * @param {*} oldChl
 * @param {*} oldStartIndex
 * @param {*} oldEndIndex
 */
function _findIndexInOld (newStartVnode, oldChl, oldStartIndex, oldEndIndex) {
  let i, oldVnode
  for (i = oldStartIndex; i <= oldEndIndex; i++) {
    oldVnode = oldChl[i]
    if (isDef(oldVnode) && sameNode(oldVnode, newStartVnode)) {
      return i
    }
  }
}