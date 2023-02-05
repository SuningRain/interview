// 组合继承

// 基类
export const Person_3 = function (name, age) {
  this.name = name
  this.age = age
}

Person_3.prototype.test = 'this is a test'
Person_3.prototype.testFunc = function () {
  console.log('this is a testFunc')
}
// 子类
export const Student_3 = function (name, age, gender, score) {
  Person_3.apply(this, [name, age]) // 盗用构造函数  => 第二次调用父类构造函数（用于获取父类的属性和方法）
  this.gender = gender
  this.score = score
}
Student_3.prototype = new Person_3() // 改变Student_3构造函数的原型对象  => 第一次调用父类构造函数（用于获取父类原型上的属性和方法）
Student_3.prototype.constructor = Student_3
Student_3.prototype.testStuFunc = function () {
  console.log('this is a testStuFunc')
}
