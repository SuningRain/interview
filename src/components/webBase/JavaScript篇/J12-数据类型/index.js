// 判断数据类型
export function getType (value) {
  const type = typeof value
  if (type !== 'object') {
    return type
  }
  return Object.prototype.toString.call(data).replace(/^[object (\S+)]$/, '$1')
}

// 手写instanceOf
export function myInstanceOf (leftValue, rightValue) {
  if (typeof rightValue !== 'function') {
    console.error(`${rightValue} is not a function`)
    return false
  }
  leftValue = Object.getPrototypeOf(leftValue)
  const rightProto = rightValue.prototype

  while (true) {
    if (leftValue === null) {
      return false
    }
    if (leftValue === rightProto) {
      return true
    }
    leftValue = Object.getPrototypeOf(leftValue)
  }
}
