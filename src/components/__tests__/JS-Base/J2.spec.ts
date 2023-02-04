import { describe, expect, it } from "vitest";
import ArrayDedupication from '../../webBase/JavaScript篇/J2-数组去重/array_deduplication'
import { method0, unique }  from '../../webBase/JavaScript篇/J2-数组去重/array_deduplication0'

describe('利用对象键名不重复', () => {
  it('正常情况', () => {
    expect(new ArrayDedupication(['1', '1', '2']).method1()).toEqual(['1', '2'])
  })
  it('数字1和字符串"1"会被当成同一个去重', () => {
    expect(new ArrayDedupication([1, '1', '2']).method1()).toEqual(['1', '2'])
  })
  it('对象调用toString方法会被设置成"[object Object]"', () => {
    expect(new ArrayDedupication([{}, { a: 1}]).method1()).toEqual(["[object Object]"])
  })
})

describe('遍历数组利用数组includes方法去重', () => {
  it('一般情况', () => {
    expect(new ArrayDedupication([1, 2, '1', '2', false, false, true, true, null, null, undefined, undefined, NaN, NaN]).method2()).toEqual([1, 2, '1', '2', false, true, null, undefined, NaN])
  })
  it('无法去重空对象', () => {
    expect(new ArrayDedupication([{}, {}]).method2()).toEqual([{}, {}])
  })
})

describe('利用Set去重', () => {
  it('一般情况', () => {
    expect(new ArrayDedupication([1, 2, '1', '2', false, false, true, true, null, null, undefined, undefined, NaN, NaN]).method3()).toEqual([1, 2, '1', '2', false, true, null, undefined, NaN])
  })
  it('无法去重空对象', () => {
    expect(new ArrayDedupication([{}, {}]).method3()).toEqual([{}, {}])
  })
})

describe('遍历数组利用数组indexOf方法去重', () => {
  it('一般情况', () => {
    expect(new ArrayDedupication([1, 2, '1', '2', false, false, true, true, null, null, undefined, undefined]).method4()).toEqual([1, 2, '1', '2', false, true, null, undefined])
  })
  it('无法去重空对象', () => {
    expect(new ArrayDedupication([{}, {}]).method4()).toEqual([{}, {}])
  })
  it('无法去重NaN', () => {
    expect(new ArrayDedupication([NaN, NaN]).method4()).toEqual([NaN, NaN])
  })
})

describe('遍历数组利用数组hasOwnProperty方法去重', () => {
  it('一般情况', () => {
    expect(new ArrayDedupication([1, 2, '1', '2', false, false, true, true, null, null, undefined, undefined, NaN, NaN]).method5()).toEqual([1, 2, '1', '2', false, true, null, undefined, NaN])
  })
  it('可以去重空对象', () => {
    expect(new ArrayDedupication([{}, {}]).method5()).toEqual([{}])
  })
})