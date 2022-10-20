import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import { ElInput } from 'element-plus'

describe('Input', () => {
  it('是否存在', () => {
    expect(ElInput).to.be.ok
  })
  it('测试v-model', () => {
    const wrapper = mount(ElInput, { props: { modelValue: '你好' } })
    // const e = new InputEvent('input', { bubbles: false, data: '哈哈' })
    // wrapper.vm.$el.dispatchEvent(e)
    expect(wrapper.vm.$el.querySelector('input').value).toBe('你好')
  })
})