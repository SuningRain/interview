/*
 * @Descripttion: 初始化vue
 * @Author: ZhangYu
 * @Date: 2023-03-25 23:00:49
 * @LastEditors: ZhangYu
 * @LastEditTime: 2023-03-26 20:26:03
 */
import observe from "../observer";
import compile from "../complier";
export default class MyVue  {
  constructor (options) {
    this.$data = options.data
    observe(options.data)
    compile(options.el, this)
    console.log(this)
  }
}