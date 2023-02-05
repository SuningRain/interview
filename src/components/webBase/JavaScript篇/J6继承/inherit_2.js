// 借用构造函数继承

// 特点

// 解决了原型链继承中子类实例共享父类引用属性的问题
// 创建子类实例时，可以向父类传递参数
// 可以实现多继承(call多个父类对象)

// 缺点

// 实例并不是父类的实例，只是子类的实例
// 只能继承父类的实例属性和方法，不能继承原型属性和方法
// 无法实现函数复用，每个子类都有父类实例函数的副本，影响性能

export function Person_2 (name, age) {
  this.name = name
  this.age = age
  this.setName = function () {}
}
Person_2.prototype.setAge = function () {}
export function Student_2 (name, age, price) {
  Person_2.call(this, name, age)
  this.price = price
}
