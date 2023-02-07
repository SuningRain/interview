// 手写节流函数
function myThrottle (fn, interval, immediate = true, final = true) {
  // 当前事件触发的时间
  let nowTime
  // 上一次触发的时间
  let lastTime = 0
  // 最后一次执行定时器
  let timer

  // 事件触发时真正执行的函数
  function _myThrottle (...args) {
    // 获取当前触发的时间
    nowTime = new Date().getTime()
    // 如果不立即执行，并且函数没有执行过
    if (!immediate && lastTime === 0) {
      lastTime = nowTime
    }
    // 清除定时器
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    // 当前触发的时间 - 上次触发的时间 > 设置的间隔时间 执行
    if (nowTime - lastTime >= interval) {
      fn.apply(this, ...args)
      lastTime = nowTime
      return
    }
    if (final && !timer) {
      timer = setTimeout(() => {
        fn(this, ...args)
        lastTime = 0
        timer = null
      }, interval - (nowTime - lastTime))
    }
  }
  return _myThrottle
}
