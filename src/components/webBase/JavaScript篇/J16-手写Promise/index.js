export class MyPromise {
  // 当前状态 共三种情况 ['pending', 'fulfilled', 'rejected']
  PromiseState = 'pending'
  // 当前执行结果, 根据resolve和reject执行结果而定
  PromiseResult = null
  // 收集外部的成功回调函数
  onFulfilledCallBackList = []
  // 收集外部的失败回调函数
  onRejectedCallBackList = []

  constructor (executor) {
    this.initValue()
    this.initBind()
    try {
      // 执行外部函数
      executor(this.resolve)
    } catch (e) {
      // 捕获到错误，直接reject
      this.reject(e)
    }
  }

  // 初始化属性值
  initValue () {
    // 默认开始为’pending‘状态
    this.PromiseState = 'pending'
    this.PromiseResult = null
    this.onFulfilledCallBackList = []
    this.onRejectedCallBackList = []
  }

  // 绑定this，防止随执行环境改变而改变
  initBind () {
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
  }

  // 外部函数执行成功的回调
  resolve (value) {
    if (this.PromiseState !== 'pending') return
    this.PromiseState = 'fulfilled'
    this.PromiseResult = value
    while (this.onFulfilledCallBackList.length) {
      this.onFulfilledCallBackList.shift()(this.PromiseResult)
    }
  }

  // 外部函数执行失败的回调
  reject (reason) {
    if (this.PromiseState !== 'pending') return
    this.PromiseState = 'rejected'
    this.PromiseResult = reason
    while (this.onRejectedCallBackList.length) {
      this.onRejectedCallBackList.shift()(this.PromiseResult)
    }
  }
  /**
   * 链式回调
   * @param {*} onFulfilled 状态如果是成功
   * @param {*} onRejected 状态如果是失败
   */
  then (onFulfilled, onRejected) {
    // 参数校验，确保一定是函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : reason => {
            throw reason
          }
    const thenPromise = new MyPromise((resolve, reject) => {
      const resolvePromise = cb => {
        try {
          const x = cb(this.PromiseResult)
          if (x === thenPromise) {
            // 不能返回自身哦
            throw new Error('不能返回自身。。。')
          }
          if (x instanceof MyPromise) {
            // 如果返回值是Promise
            // 如果返回值是promise对象，返回值为成功，新promise就是成功
            // 如果返回值是promise对象，返回值为失败，新promise就是失败
            // 谁知道返回的promise是失败成功？只有then知道
            x.then(resolve, reject)
          } else {
            // 非Promise就直接成功
            resolve(x)
          }
        } catch (err) {
          console.log('异常', err)
          // 处理报错
          reject(err)
          throw new Error(err)
        }
      }
      if (this.PromiseState === 'fulfilled') {
        resolvePromise(onFulfilled)
      } else if (this.PromiseState === 'rejected') {
        resolvePromise(onRejected)
      } else {
        this.onFulfilledCallBackList.push(
          resolvePromise.bind(this, onFulfilled)
        )
        this.onRejectedCallBackList.push(resolvePromise.bind(this, onRejected))
      }
    })
    return thenPromise
  }
}
