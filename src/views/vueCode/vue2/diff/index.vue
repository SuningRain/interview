/**
 * @Descripttion: vue diff 算法测试
 * @Author: ZhangYu
 * @Date: 2023-03-22 16:01:34
 * @LastEditors: ZhangYu
 * @LastEditTime: 2023-03-22 17:59:32
 */

<script setup lang='ts'>
import { ref } from 'vue'
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

const keyClick = () => {
  const t1 = setTimeout(() => {
    testList1.value.unshift({ key: 5, value: 5 })
    clearTimeout(t1)
  }, 1000)
}

const noKeyClick = () => {
  const t2 = setTimeout(() => {
    testList2.value.unshift({ value: 5 })
    clearTimeout(t2)
  }, 1000)
}

const indexKeyClick = () => {
  const t3 = setTimeout(() => {
    testList3.value.unshift({ value: 5 })
    clearTimeout(t3)
  }, 1000)
}
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
    <ul>
      <li v-for="item in testList3" :key="item.index">
        {{item.value}}
      </li>
    </ul>
  </section>
  <section>
    <h4>测试手写diff</h4>
    <a href="/src/views/vueCode/vue2/diff/index.html">打开index.html</a>
  </section>
</template>

<style lang='less' scoped>

</style>