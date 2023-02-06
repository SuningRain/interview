export function myNew () {
  if (!arguments || !arguments[0]) {
    throw 'no constructor'
  }
  const func = arguments[0]
  if (typeof func !== 'function') {
    throw func + 'is not a constructor'
  }
  const args = Array.prototype.slice.call(arguments, 1)
  const obj = Object.create(null)
  obj.__proto__ = func.prototype
  const res = func.apply(obj, args)
  return typeof res === 'object' ? res : obj
}
