import { describe, it, expect } from "vitest";
import { TreeNode } from '../../suanfa/tree'
import { preorderTraversal, preorderTraversal2 } from '../../suanfa/前序遍历'

describe('递归算法', () => {
  it('普通用例', () => {
    const t = new TreeNode(1)
    let temp = null
    temp = t.right = new TreeNode(2)
    temp.left = new TreeNode(3)
    expect(preorderTraversal(t)).toEqual([1, 2, 3])
  })
  it('异常用例', () => {
    expect(preorderTraversal(null)).toEqual([])
  })
})

describe('非递归', () => {
  it('普通用例', () => {
    const t = new TreeNode(1)
    let temp = null
    temp = t.right = new TreeNode(2)
    temp.left = new TreeNode(3)
    expect(preorderTraversal2(t)).toEqual([1, 2, 3])
  })
  it('异常用例', () => {
    expect(preorderTraversal2(null)).toEqual([])
  })
})