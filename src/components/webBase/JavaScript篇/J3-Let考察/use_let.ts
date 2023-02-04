export function foo (this: any, p: any) {
  console.log(this)
  console.log(p)
  try {
    console.log(typeof b) // 此处代码报错，let 暂时性死区
    let b = 0
  } catch (e) {
    throw(e)
  }
}