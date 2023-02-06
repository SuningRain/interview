// 手写apply方法

function myApply (context, args) {
  // 获取调用的函数
  const fn = this
  // 将context都转成对象
  context = context === null || context === undefined ? window : Object(context)
  // 添加函数到该对象
  context.fn = fn
  // 调用函数
  const res = context.fn(...args)
  // 销毁函数
  delete context.fn
  return res
}
Function.prototype.myApply = myApply
