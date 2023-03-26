/*
 * @Descripttion: 观察者
 * @Author: ZhangYu
 * @Date: 2023-03-25 14:05:48
 * @LastEditors: ZhangYu
 * @LastEditTime: 2023-03-26 20:31:26
 */
import Dep from './dep'
export default class Watcher {
  constructor (vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb
    Dep.target = this
    key.split('.').reduce((pre, cur) => pre[cur], vm.$data) // 触发依赖收集
    Dep.target = null
  }
  update () {
    const value = this.key.split('.').reduce((pre, cur) => pre[cur], this.vm.$data)
    this.cb(value)
  }
}