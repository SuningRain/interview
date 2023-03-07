/**
 * @author ZhangYu
 * @create date 2023-03-05 13:59:02
 * @desc 实现简单的h函数 => 对应Vue内部的_createElement函数
 */

import { throwError } from 'element-plus/es/utils'
import vNode from './vnode'

// 判断一个参数是否是vNode对象
function isVnode (data) {
  return typeof data === 'object' && data.hasOwnProperty('sel')
}

export default function (sel, data, c) {
  // 检查参数个数
  if (arguments.length !== 3) {
    throw new Error('参数个数有误')
  }
  // 如果c是字符串
  if (typeof c === 'string') {
    return vNode(sel, data, null, c, null)
    // 如果c是数组
  } else if (Array.isArray(c)) {
    let children = []
    for (let i = 0; i < c.length; i++) {
      if (!isVnode(c[i])) {
        throwError(`第${i}个数组元素不是vNode`)
      }
    }
    return vNode(sel, data, children, undefined, null)
  }
  // 如果c是vNode对象
  if (isVnode(c)) {
    return vNode(sel, data, [c], undefined, null)
  }
}
