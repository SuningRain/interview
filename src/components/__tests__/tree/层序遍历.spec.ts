import { describe, it, expect } from "vitest";
import { TreeNode } from '../../suanfa/tree'
import { levelOrder, levelOrder2 } from '../../suanfa/二叉树层序遍历'

describe('二叉树层序遍历-递归方式', () => {
  let t = new TreeNode(1)
  let t1 = new TreeNode(2)
  t.left = t1
  it('正常例子', () => {
    expect(levelOrder(t)).toEqual([[1], [2]])
  })
})

describe('二叉树层序遍历-队列方式', () => {
  let t = new TreeNode(1)
  let t1 = new TreeNode(2)
  t.left = t1
  it('正常例子', () => {
    expect(levelOrder2(t)).toEqual([[1], [2]])
  })
})