/**
 * @Descripttion:
 * @Author: ZhangYu
 * @Date: 2023-03-22 16:01:34
 * @LastEditors: ZhangYu
 * @LastEditTime: 2023-03-24 17:37:15
 */
/**
 * @Descripttion: vue diff 算法测试
 * @Author: ZhangYu
 * @Date: 2023-03-22 16:01:34
 * @LastEditors: ZhangYu
 * @LastEditTime: 2023-03-22 17:59:32
 */

<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import Item from './item.vue'
const testList1 = ref([
  { key: 1 , value: 1 },
  { key: 2 , value: 2 },
  { key: 3 , value: 3 },
  { key: 4 , value: 4 }
])
const testList2 = ref([
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 }
])

const testList3 = ref([
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 }
])

// 唯一key

const keyClick = () => {
  const t1 = setTimeout(() => {
    testList1.value.unshift({ key: 5, value: 5 })
    clearTimeout(t1)
  }, 1000)
}

// 没有key

const noKeyClick = () => {
  const t2 = setTimeout(() => {
    testList2.value.unshift({ value: 5 })
    clearTimeout(t2)
  }, 1000)
}

// index作为key

const indexKeyClick = () => {
  const t3 = setTimeout(() => {
    testList3.value.unshift({ value: 5 })
    clearTimeout(t3)
  }, 1000)
}

const indexKeyShift = () => {
  const t4 = setTimeout(() => {
    testList3.value.shift()
    clearTimeout(t4)
  }, 1000)
}

const listRef = ref([])

onMounted(() => {
  console.log(listRef)
})

</script>

<template>
  <section>
    <button @click="keyClick">有key</button>
    <ul>
      <li v-for="item in testList1" :key="item.key">
        {{item.value}}
      </li>
    </ul>
    <button @click="noKeyClick">无key</button>
    <ul>
      <li v-for="item in testList2" :key="item.key">
        {{item.value}}
      </li>
    </ul>
    <button @click="indexKeyClick">index作为key</button>
    <button @click="indexKeyShift">删除第一个元素</button>
    <ul ref="listRef">
      <Item v-for="(item, index) in testList3" :key="index" :value="item.value">
      </Item >
    </ul>
  </section>
  <section>
    <h4>测试手写diff</h4>
    <a href="/src/views/vueCode/diff/index.html">打开index.html</a>
  </section>
</template>

<style lang='less' scoped>

</style>