function myReduce (callback, initialValue) {
  if (!Array.isArray(this) || !this.length || typeof callback !== 'function') {
    return []
  } else {
    // 判断是否有初始值
    let hasInitialValue = initialValue !== undefined
    let value = hasInitialValue ? initialValue : this[0]
    for (let index = hasInitialValue ? 0 : 1; index < this.length; index++) {
      const element = this[index]
      value = callback(value, element, index, this)
    }
    return value
  }
}
Array.prototype.myReduce = myReduce
