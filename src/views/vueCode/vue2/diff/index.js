/*
 * @Descripttion:
 * @Author: ZhangYu
 * @Date: 2023-03-22 21:16:19
 * @LastEditors: ZhangYu
 * @LastEditTime: 2023-03-23 17:25:29
 */
import h from '@/components/webBase/Vue篇/v3-实现原理/h.js'
import patch from '@/components/webBase/Vue篇/v3-实现原理/patch.js'

const container = document.getElementById('container')

// 测试vnode1挂载到dom节点上
// const vnode1 = h('ul', {}, [
//   h('li', {}, '1'),
//   h('li', {}, '2'),
//   h('li', {}, '3'),
//   h('li', {}, '4'),
//   h('li', {}, '5')
// ])
// patch(container, vnode1)

const vnode1 = h('ul', {}, [
  h('li', { key: 1 }, '1'),
  h('li', { key: 2 }, '2'),
  h('li', { key: 3 }, '3'),
  h('li', { key: 4 }, '4'),
  h('li', { key: 5 }, '5')
])
patch(container, vnode1)

const testNoKey = document.getElementsByClassName('test-no-key')
const vnode2 = h('ul', {}, [
  h('li', {}, '5'),
  h('li', {}, '4'),
  h('li', {}, '3'),
  h('li', {}, '2'),
  h('li', {}, '1')
])
testNoKey[0].onclick = () => {
  patch(vnode1, vnode2)
}

const testIndexKey = document.getElementsByClassName('test-index-key')
testIndexKey[0].onclick = () => {
  // 模拟通过for循环的方式在前面插入元素
  const vnode3 = h('ul', {}, [
    h('li', { key: 1 }, '6'),
    h('li', { key: 2 }, '1'),
    h('li', { key: 3 }, '2'),
    h('li', { key: 4 }, '3'),
    h('li', { key: 5 }, '4'),
    h('li', { key: 6 }, '5')
  ])
  patch(vnode1, vnode3)
}

const testUniqueKey = document.getElementsByClassName('test-unique-key')
testUniqueKey[0].onclick = () => {
  const vnode4 = h('ul', {}, [
    h('li', { key: 3 }, '3'),
    h('li', { key: 5 }, '5'),
    h('li', { key: 1 }, '1'),
    h('li', { key: 4 }, '4'),
    h('li', { key: 2 }, '2')
  ])
  patch(vnode1, vnode4)
}
// 第一次比较 key: 3 !== 1 key: 2 !== 5 key: 2 !== 1 key: 3 !== 5

// 从3开始 在旧节点中寻找 开始 根据 key === 3，=> index === 3
// 将旧的真实dom节点移动到1前面，并标记vnode节点为undefined

// 5 1 4 2    1 2 undefined 4 5   dom => 3 1 2 4 5

// 继续比较 5 !== 1 2 !== 5 2 !== 1 5 === 5
// 将旧的真实dom节点移动到1前面，并标记vnode节点为undefined

// 1 4 2      1 2 undefined 4 undefined     dom => 3 5 1 2 4

// 继续比较 1 === 1
// 不用动

// 4 2        2 undefined 4 undefined
// 4 !== 2 2 !== 4 2 === 2
// 将真实的dom移动到4后面

// 4          undefined 4 undeined         dom => 3 5 1 4 2

// 继续比较 4 === 4 结束

// 每个节点都有匹配到，所有dom都复用了