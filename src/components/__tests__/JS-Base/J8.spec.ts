import { describe, expect, it } from "vitest";
import { myCall } from '../../webBase/JavaScript篇/J8-手写call_apply_bind/myCall'
import { myApply } from '../../webBase/JavaScript篇/J8-手写call_apply_bind/myApply'
import { myBind } from '../../webBase/JavaScript篇/J8-手写call_apply_bind/myBind'

describe('测试手写call', () => {
  it('案例1-无返回值', () => {
    function a () {
      console.log('哈哈哈')
    }
    const b = false
    //@ts-ignore
    a.myCall(b)
    expect
  })
  it('案例2-有返回值无参数', () => {
    function a () {
      return '哈哈哈'
    }
    const b = {}
    //@ts-ignore
    expect(a.myCall(b)).toEqual('哈哈哈')
  })
  it('案例3-有参数有返回值', () => {
    function a (name: any, age: any) {
      return `${name}今年${age}了`
    }
    const b = {}
    //@ts-ignore
    expect(a.myCall(b, '张三', '18')).toEqual('张三今年18了')
  })
})

describe('测试手写apply', () => {
  it('案例1', () => {
    function a (name: any, age: any) {
      return `${name}今年${age}了`
    }
    const b = {}
    //@ts-ignore
    expect(a.myApply(b, ['张三', '18'])).toEqual('张三今年18了')
  })
})

describe('测试手写bind', () => {
  it('案例1', () => {
    function a (name: any, age: any) {
      return `${name}今年${age}了`
    }
    const b = {}
    //@ts-ignore
    const testFn = a.myBind(b, '张三')
    expect(testFn('18')).toEqual('张三今年18了')
  })
})