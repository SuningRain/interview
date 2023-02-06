// 手写bind

export function myBind (context, ...args1) {
  // 获取调用的函数
  const fn = this
  // 将context都转成对象
  context = context === null || context === undefined ? window : Object(context)
  // 返回一个函数，因为bind方法不是立即执行
  return function (...args2) {
    // 添加函数到该对象
    context.fn = fn
    // 调用函数
    const res = context.fn(...args1, ...args2)
    // 销毁函数
    delete context.fn
    return res
  }
}
Function.prototype.myBind = myBind
