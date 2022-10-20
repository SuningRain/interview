import type { TreeNode } from './tree'
/**
 * 树的前序遍历递归算法
 * @param root TreeNode类
 * @return int整型一维数组
 */
function preorderTraversal(root: TreeNode | null) {
  // write code here
  let res: any = []
  function dfs(root: TreeNode | null) {
    if (!root) {
      return []
    }
    res.push(root.val)
    if (root.left !== null) {
      dfs(root.left)
    }
    if (root.right !== null) {
      dfs(root.right)
    }
  }
  dfs(root)
  return res
}

/**
 * 树的前序遍历非递归算法
 */
function preorderTraversal2(root: TreeNode | null) {
  let res = []
  let stack = []
  let p = root
  let q
  if (root === null) {
    return []
  }
  while (p != null) {
    res.push(p.val)
    q = p.right
    if (q != null) {
      stack.push(q)
    }
    p = p.left
    if (p === null && stack.length > 0) {
      p = stack.pop()
    }
  }
  return res
}

export { preorderTraversal, preorderTraversal2 }