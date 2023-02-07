export function getType (value) {
  const type = typeof value
  if (type !== 'object') {
    return type
  }
  return Object.prototype.toString.call(data).replace(/^[object (\S+)]$/, '$1')
}
