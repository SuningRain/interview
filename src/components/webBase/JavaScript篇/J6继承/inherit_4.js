// 组合继承优化 1

// 优点

// 不会初始化两次实例方法/属性，避免的组合继承的缺点

// 缺点

// 没办法辨别是实例是子类还是父类创造的，子类和父类的构造函数指向是同一个

export function Person_4 (name, age) {
  this.name = name
  this.age = age
  this.setAge = function () {}
}
Person_4.prototype.setAge = function () {
  console.log('111')
}
export function Student_4 (name, age, price) {
  Person_4.call(this, name, age)
  this.price = price
  this.setScore = function () {}
}
Student_4.prototype = Person_4.prototype
Student_4.prototype.sayHello = function () {}
