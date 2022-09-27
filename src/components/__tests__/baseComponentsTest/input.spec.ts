import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import { ElInput } from 'element-plus'

describe('Input', () => {
  it('渲染', () => {
    const wrapper = mount(ElInput, { props: { modelValue: '你好' } })
    expect(wrapper.vm.$props.modelValue).toBe('你好')
  })
})
