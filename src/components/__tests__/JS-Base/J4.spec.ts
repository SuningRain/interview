import { describe, expect, it } from "vitest";
import { Foo } from '../../webBase/JavaScript篇/J4-数组slice和splice/example'

describe('测试数组slice和splice方法', () => {
  it('案例1', () => {
    const foo = new Foo([0, 1, 2, 3])
    expect(foo.bar(1)).toEqual([0])
    expect(foo.bar(2).splice(1, 1)).toEqual([1])
    expect(foo.arr).toEqual([0, 1, 2, 3])
  })
})