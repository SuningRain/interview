export class UseArrowFunctionClass {
  method1 = () => '这是一个箭头函数'

  // 如果不是ts文件的类型检查，a可以不用声明类型，这样一个变量就可以不用变量
  method2 = (a: any) => `一个形式参数的箭头函数${a}`

  method3 = (a: any, b: any) => {
    return `一般形式的箭头函数${a + b}`
  }

  method4 = () => {
    return this
  }

  // method5 = () => {
  //   try {
  //     console.log(arguments) // 报错
  //   } catch (e) {
  //     throw(e)
  //   }
  // }
}

export function arrowFunction () {
  const innner = () => {
    console.log(this)
  }
  return innner
}