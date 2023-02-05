// 组合式继承优化 2

export function Person_5 (name, age) {
  this.name = name
  this.age = age
}
Person_5.prototype.arr = [1, 2]
Person_5.prototype.setAge = function (name) {
  this.name = name
}
export function Student_5 (name, age, price) {
  Person_5.call(this, name, age)
  this.price = price
  this.setScore = function () {}
}
Student_5.prototype = Object.create(Person_5.prototype) //核心代码
Student_5.prototype.constructor = Student_5 //核心代码
