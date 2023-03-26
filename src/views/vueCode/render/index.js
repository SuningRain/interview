import MyVue from '@/components/webBase/Vue篇/v3-实现原理/init/index.js'

var myVm = new MyVue({
  el: '#app',
  data: {
    name: '张三',
    more: {
      like: '法律'
    }
  }
})
const bt = document.getElementById('bt')
bt.onclick = function () {
  myVm.$data.more.like = '法律' + Math.floor(Math.random() * 10 + 1)
}