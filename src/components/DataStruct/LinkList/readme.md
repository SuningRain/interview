#### MAP

- KEY

  > 1. 基础类型按值
  > 2. 引用类型按地址

- 属于哈希表

#### 链表种类

> 1. 单向链表

```
type Node {
  value: any;
  next: Node;
}

```

> 2. 双向链表

```
type Node {
  value: any;
  next: Node;
  prev: Node;
}
```

#### 面试笔试区别

1. 笔试不要太在乎空间复杂度，一切为了时间复杂度
2. 面试时间复杂度仍然第一，但是要找到空间最省的方法
