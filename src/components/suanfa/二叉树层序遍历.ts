import type { TreeNode } from './tree'

/**
 * 层序遍历-递归方式
 * @param root TreeNode类
 * @return int整型二维数组
 */
export function levelOrder(root: TreeNode | null): number[][] {
  let res: any[][] = []
  function innderLevelOrder(root: TreeNode | null, level: number) {
    if (!root) return
    if (level >= res.length) {
      res.push([])
    }
    res[level].push(root.val)
    innderLevelOrder(root.left, level + 1)
    innderLevelOrder(root.right, level + 1)
  }
  innderLevelOrder(root, 0)
  return res
}


/**
 * 层序遍历-队列方式
 * @param root TreeNode类
 * @returns int整型二维数组
 */
export function levelOrder2(root: TreeNode): number[][] {
  // write code here
  if (!root) return []
  let queue = [root]
  let res = []
  while (queue.length) {
    let rowData = []
    const size = queue.length
    for (let i = 0; i < size; i++) {
      const top = queue.shift()
      rowData.push(top.val)
      if (top.left) {
        queue.push(top.left)
      }
      if (top.right) {
        queue.push(top.right)
      }
    }
    if (rowData.length) res.push(rowData)
  }
  return res
}
