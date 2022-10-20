
class TreeNode {
  val: any;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(v: any) {
    this.val = v;
    this.left = null;
    this.right = null;
  }
}
export { TreeNode }