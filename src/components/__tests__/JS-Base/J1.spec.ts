import { describe, expect, it } from "vitest";
import Example_ES6 from '../../webBase/JavaScript篇/J1-ES6转ES5/index-es6'
import Example_ES5 from '../../webBase/JavaScript篇/J1-ES6转ES5/index-es5.js'

describe('测试ES6转ES5', () => {
  it('两个结果相等', () => {
    expect(new Example_ES6('hello').init()).toEqual(new Example_ES5('hello').init())
  }),
  it('es5非new抛异常', () => {
    expect(() => {
      Example_ES5()
    }).toThrow('Class constructor cannot be invoked without new')
  }),
  it('init方法不可枚举', () => {
    expect(Example_ES5.prototype.propertyIsEnumerable('init')).toBe(false)
  })
  it('init不是构造函数', () => {
    expect(() => {
      new Example_ES5.prototype.init()
    }).toThrowError('init is not a constructor')
  })
})