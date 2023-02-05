// 原型继承
// 来自原型对象的所有属性被所有实例共享
// 创建子类实例时，无法向父类构造函数传参
// 无法实现多继承

// 父类型
export function Person (age) {
  this.name = '张三'
  this.age = age
  this.arr = [1, 2, 3]
}

Person.prototype.setAge = function (age) {
  this.age = age
}

// 子类型
export function Student (score) {
  this.score = score
  this.setScore = function (score) {
    this.score = score
  }
}
