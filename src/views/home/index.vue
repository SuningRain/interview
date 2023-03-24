/**
 * @Descripttion:
 * @Author: ZhangYu
 * @Date: 2023-03-07 19:57:13
 * @LastEditors: ZhangYu
 * @LastEditTime: 2023-03-24 16:28:50
 */

<script setup lang='ts'>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const vueCodeStudyList = ref([
  { name: '响应式原理学习', path: '/vueCode/diff' },
  { name: 'diff算法学习', path: '/vueCode/diff' }
])

const handleAClick = (e, item) => {
  e.preventDefault()
  router.push({ path: item.path})
}
</script>

<template>
  <div class="home">
    <header>
      <h1>前端学习</h1>
    </header>
    <div class="vue-2">
      <ul>
        <li
          v-for="(item, $index) of vueCodeStudyList"
          :key="$index">
          <a href="" @click="(e) => handleAClick(e, item)">{{item.name}}</a>
          </li>
      </ul>
    </div>
  </div>
</template>

<style lang='less' scoped>

</style>