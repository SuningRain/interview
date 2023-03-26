/*
 * @Descripttion: 数据观察者，观测数据变化
 * @Author: ZhangYu
 * @Date: 2023-03-25 14:05:28
 * @LastEditors: ZhangYu
 * @LastEditTime: 2023-03-26 20:51:18
 */
import { hasOwn } from './utils'
import Dep from "../observer/dep"

class Obeserver {
  constructor (obj) {
    if (Array.isArray(obj)) {
      // todo
    } else {
      // 对对象的所有属性值进行遍历观测
      const keys = Object.keys(obj)
      for (let i = 0; i < keys.length; i++) {
        // 对每个属性进行响应式处理
        defineReactive(obj, keys[i])
      }
    }
  }
}

// // 定义响应式对象的 响应式属性
// function def (obj, key, value, enumerable) {
//   Object.defineProperty(obj, key, {
//     value,
//     enumerable: !!enumerable,
//     configurable: true,
//     writable: true
//   })
// }

// 观测
export default function observe (obj) {
  if (!obj || typeof obj !== 'object') return
  // 如果已经是响应式对象了就不需要重新创建了
  if (hasOwn(obj, '__ob__') && obj.__ob__ instanceof Obeserver) {
    return obj.__ob__
  } else {
    return new Obeserver(obj)
  }
}

// 设置对象属性进行数据劫持，并进行响应式处理
function defineReactive (obj, key) {
  let value = obj[key] // 首先获取旧值
  observe(value) // 这里递归对子属性进行响应式处理
  const dep = new Dep() // 每一个响应式对象都需要一个依赖收集容器
  Object.defineProperty(obj, key, {
    enumerable: true, // 设置该key为可枚举
    configurable: true, // 设置该key可配置
    get: function () {
      // 依赖收集
      console.log(`读取属性${key}`)
      if (Dep.target) { // 所有属性的读取都会触发get，这里只对添加watcher进行依赖收集
        dep.depend(Dep.target)
      }
      return value
    },
    set: function (newValue) {
      if (newValue !== value) {
        console.log(`设置属性${key}，新值：${newValue}`)
        value = newValue
        observe(newValue)
        // 触发依赖更新
        dep.notify()
      }
    }
  })
}