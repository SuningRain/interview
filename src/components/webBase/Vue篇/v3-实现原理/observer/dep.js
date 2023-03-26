/*
 * @Descripttion: 依赖收集器
 * @Author: ZhangYu
 * @Date: 2023-03-25 14:05:53
 * @LastEditors: ZhangYu
 * @LastEditTime: 2023-03-26 20:29:05
 */
export default class Dep {
  static target = null // 静态类变量，用于表示当前触发的是哪一个依赖更新
  subs // 依赖收集列表
  constructor () {
    this.subs = []
  }

  // 收集依赖
  depend (sub) {
    this.subs.push(sub)
  }

  // 通知依赖
  notify () {
    console.log('通知依赖刷新', this.subs)
    for (let i = 0; i < this.subs.length; i++) {
      this.subs[i].update()
    }
  }
}