// 手写防抖函数
function myDebounce (fn, delay = 3000, immediate = false) {
  // 设置定时器
  let timer = null
  // 是否调用过
  let isInvoke = false
  // 真正执行的函数
  function _myDebounce (...args) {
    // 如果是第一次调用，立即执行
    if (immediate && !isInvoke) {
      fn.apply(this, args)
      isInvoke = true
    } else {
      // 取消上一次的定时器
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  }
  // 新增cancel来取消定时器
  _myDebounce.cancel = function () {
    clearTimeout(timer)
    timer = null
  }
  return _myDebounce
}
