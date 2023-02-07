// 闭包在某些场景下的作用及优化

const obj = new Object()
const events = { m1: 'clicked', m2: 'changed' }

// 使用闭包为每个内部函数保留一份独立的，可访问的upvalue

for (e in events) {
  obj[e] = (function (aValue) {
    // 闭包1
    return function () {
      // 闭包2
      console.log(events[aValue])
    }
  })(e)
}
obj.m1()
obj.m2()

// 在ES6之后，可使用块级作用域 let

// 但是上面两种方法，在JavaScript引擎内部，仍然为每次的循环创建了一个自己的环境，没有减少消耗
// 其本质是要报错for...in过程中的每一个值e，既然过程中产生了不同的函数实例，自然也可以将值e交给
// 这些函数实例自己保存

for (e in events) {
  ;(obj[e] = function () {
    // arguments.calleee指向匿名函数自身。这里也可以使用具名函数
    console.log(events[arguments.callee.aValue])
  }).aValue = e
}
obj.m1()
obj.m2()
