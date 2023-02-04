import { describe, expect, it } from "vitest";
import { foo } from '../../webBase/JavaScript篇/J3-Let考察/use_let'

describe('测试let暂时性死区', () => {
  it('案例1', () => {
    expect(() => {
      foo(undefined)
    }).toThrowError('')
  })
})