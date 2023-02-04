import { describe, expect, it } from "vitest";
import { UseArrowFunctionClass, arrowFunction } from '../../webBase/JavaScript篇/J5-箭头函数/arraw_function'

describe('测试箭头函数', () => {
  const useArrowFunctionClass = new UseArrowFunctionClass()
  it('测试this', () => {
    // 情况1
    const temp = useArrowFunctionClass.method4
    expect(temp() instanceof UseArrowFunctionClass).toEqual(true)
    // 情况2
    class TempClass {
      tempMethod = useArrowFunctionClass.method4
    }
    expect(new TempClass().tempMethod() instanceof UseArrowFunctionClass).toEqual(true)
    // 情况3
    function tempFunction () {
      expect(useArrowFunctionClass.method4() instanceof UseArrowFunctionClass).toEqual(true)
    }
    tempFunction()
    // 情况4
    console.log("这里的this" + this)
    const temp2 = arrowFunction()
    expect(temp2()).toEqual(undefined)

    const temp3 = {
      c: arrowFunction()
    }
    expect(temp3.c()).toEqual(undefined)
  })
})