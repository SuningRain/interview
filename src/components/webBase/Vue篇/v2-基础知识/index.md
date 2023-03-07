#### SPA 单页面理解

1. 概念：只有一个 HTML 页面，跳转是组件间的切换；
2. 优点：跳转流畅，组件化开发，组件可复用，开发便捷；
3. 缺点：首屏加载过慢，SEO 优化不好。

#### MPA 多页面理解

1. 概念：有多个页面，跳转方式是页面之间的跳转；
2. 优点：组件化开发，组件可复用，开发便捷，首屏加载快，SEO 优化好；
3. 缺点：跳转是整个页面刷新 。

#### v-show 和 v-if

v-show

> 只是简单地基于 CSS 的 “display” 属性进行切换

v-if

> 因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建
> 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。


#### Class与Style如何进行动态绑定

1. 对象语法
```vue
<template>
   <div v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>
   data () {
      return {
        isActive: true,
        hasError: false
      }
   }
</template>
```

1. 数组语法
```vue
<template>
  <div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
  data () {
      return {
        activeClass: 'active',
        errorClass: 'text-danger'
      }
   }
</template>
```

#### 怎样理解Vue的单向数据流
1.