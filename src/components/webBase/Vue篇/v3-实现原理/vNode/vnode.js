/*
 * @Descripttion: 创建vNode对象
 * @Author: ZhangYu
 * @Date: 2023-03-25 00:15:32
 * @LastEditors: ZhangYu
 * @LastEditTime: 2023-03-25 14:03:22
 */
export default function (sel, data, children, text, elm) {
  let key = data.key
  return { sel, data, children, text, elm, key }
}
