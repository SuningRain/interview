import { describe, expect, it } from "vitest";
import { Person, Student } from '../../webBase/JavaScript篇/J6继承/inherit_1'
import { Person_2, Student_2 } from '../../webBase/JavaScript篇/J6继承/inherit_2'
import { Person_4, Student_4 } from '../../webBase/JavaScript篇/J6继承/inherit_4'
import { Person_5, Student_5 } from '../../webBase/JavaScript篇/J6继承/inherit_5'

describe('测试原型链继承', () => {
  Student.prototype = new Person()
  Student.prototype.constructor = Student
  it('所有属性被所有实例共享', () => {
    const student1 = new Student()
    const student2 = new Student()
    expect(student1.name).toEqual('张三')
    expect(student2.name).toEqual('张三')
    student1.__proto__.name = '李四'
    expect(student1.name).toEqual('李四')
    expect(student2.name).toEqual('李四')
  })
})

describe('测试构造函数继承', () => {
  const student1 = new Student_2()
  it('不是父类的实例', () => {
    expect(student1 instanceof Student_2).toEqual(true)
    expect(student1 instanceof Person_2).toEqual(false)
  })
  it('不能继承父类原型链上的方法', () => {
    expect(() => {
      student1.setAge()
    }).toThrow('')
  })

  describe('测试组合式继承优化1', () => {
    const student1 = new Student_4()
    it('无法区分实例是子类创造的还是父类创造的', () => {
      expect(student1.constructor === Student_4).toEqual(false)
      expect(student1.constructor).toEqual(Person_4)
    })
  })

  describe('测试组合式继承优化2', () => {
    const student1 = new Student_5()
    const student2 = new Student_5()
    it('共享了一个原型对象', () => {
      expect(student1.arr).toEqual([1, 2])
      student1.arr.push(3)
      expect(student2.arr).toEqual([1, 2, 3])
    })
  })
})