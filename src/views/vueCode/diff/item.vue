/**
 * @Descripttion: 如果外部没有传入可变参数value，
 * 则该template转为vnode后，猜测是当成静态节点，vue源码
 * https://github.com/vuejs/vue/blob/a9ca2d85193e435e668ba25ace481bfb176b0c6e/src/core/vdom/patch.ts#L584
 * 第616行
 * 这个时候只会patchNode会原样返回不会再比较text和children
 * @Author: ZhangYu
 * @Date: 2023-03-24 12:49:08
 * @LastEditors: ZhangYu
 * @LastEditTime: 2023-03-24 12:50:31
 */
<script setup lang='ts'>

defineProps({
  value: Number
})

</script>

<template>
  <div>
    {{value}}
  </div>
</template>

<style lang='less' scoped>

</style>