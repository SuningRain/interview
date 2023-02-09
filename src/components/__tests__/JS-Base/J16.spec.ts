import { describe, expect, it } from "vitest";
//@ts-ignore
import { MyPromise } from '../../webBase/JavaScript篇/J16-手写Promise/index'

describe('测试手写Promise', () => {
  it('测试链式调用', () => {
    //@ts-ignore
    const test1 = new MyPromise((resolve) => {
      resolve('测试')
    })
    test1.then((res: any) => {
      expect(res).toEqual('测试1')
    }).catch(e =)
  })
})