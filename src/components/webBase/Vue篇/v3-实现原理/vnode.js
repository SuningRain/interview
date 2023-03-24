/*
 * @Descripttion:
 * @Author: ZhangYu
 * @Date: 2023-03-05 13:48:09
 * @LastEditors: ZhangYu
 * @LastEditTime: 2023-03-23 11:03:34
 */
export default function (sel, data, children, text, elm) {
  let key = data.key
  return { sel, data, children, text, elm, key }
}
