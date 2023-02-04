export function method0 (originArr) {
  var result = {} // 利用对象属性名的唯一性来保证不重复
  for (var i = 0; i < originArr.length; i++) {
    console.log('我的值', originArr[i])
    if (!result[originArr[i]]) {
      result[originArr[i]] = true
    }
  }
  return Object.keys(result) // 获取对象所有属性名的数组
}

export function unique (arr) {
  if (!Array.isArray(arr)) {
    console.log('type error!')
    return
  }
  var arrry = []
  var obj = {}
  for (var i = 0; i < arr.length; i++) {
    if (!obj[arr[i]]) {
      arrry.push(arr[i])
      obj[arr[i]] = 1
    } else {
      obj[arr[i]]++
    }
  }
  return arrry
}
