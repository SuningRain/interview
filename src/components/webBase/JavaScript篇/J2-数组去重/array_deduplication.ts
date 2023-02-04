export default class ArrayDedupication {
  originArr: any;

  constructor (originArr: Array<any>) {
    this.originArr = originArr
  }
  // 利用对象属性名的唯一性来保证不重复，
  // 注意！！！！！！！这种方法有大问题，因为所有的key都会被转为字符串
  method1 (): Array<any> {
    let tempObj: {
      [key: string | number| symbol]: boolean;
    } = {}
    for (let arrItem of this.originArr) {
      if (!tempObj[arrItem]) {
        tempObj[arrItem] = true
      }
    }
    return Object.keys(tempObj)
  }
  // 任意数组去重，适配范围广，效率低
  method2 (): Array<any> {
    let tempArr : Array<any> = []
    for (let arrItem of this.originArr) {
      if (!tempArr.includes(arrItem)) {
        tempArr.push(arrItem)
      }
    }
    return tempArr
  }
  // 利用 ES6 的 Set 去重，适配范围广，效率一般，书写简单
  method3 (): Array<any> {
    return [...new Set(this.originArr)]
  }
  // 利用IndexOf方法去重
  method4 (): Array<any> {
    let tempArr : Array<any> = []
    for (let item of this.originArr) {
      if (tempArr.indexOf(item) === - 1) {
        tempArr.push(item)
      }
    }
    return tempArr
  }
  // 利用hasOwnProperty方法去重
  method5 (): Array<any> {
    let tempObj : {
      [key: string| number]: true
    } = {}
    return this.originArr.filter((item: any) => {
      return tempObj.hasOwnProperty(typeof item + item) ? false : tempObj[typeof item + item] = true
    })
  }
}