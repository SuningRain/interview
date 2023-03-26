/*
 * @Descripttion: observer 工具类
 * @Author: ZhangYu
 * @Date: 2023-03-25 14:06:02
 * @LastEditors: ZhangYu
 * @LastEditTime: 2023-03-25 23:57:37
 */
const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}