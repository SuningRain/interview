/**
 * @author ZhangYu
 * @create date 2023-03-06 10:52:58
 * @modify date 2023-03-06 10:52:58
 * @desc Vue vNode工具类
 */
// 判断一个参数是否是vNode对象
export function isVnode (data) {
  return typeof data === 'object' && data.hasOwnProperty('sel')
}

export function isDef (value) {
  return value !== undefined && value !== null
}

export function isUndef (value) {
  return value === undefined || value === null
}

export function sameNode (aNode, bNode) {
  return aNode.sel === bNode.sel && aNode.key === bNode.key
}
