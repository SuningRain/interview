import { describe, expect, it } from "vitest";
// @ts-ignore
import { myNew } from '../../webBase/JavaScript篇/J7-手写new/myNew'

describe('测试手写new', () => {
  function Person (name: any) {
    // @ts-ignore
    this.name = name
  }
  it('创建对象', () => {
    expect(myNew(Person, '张三').name).toEqual('张三')
  })
  it('非函数', () => {
    expect(() => {
      myNew({ a: 4 })
    }).throw('')
  })
})