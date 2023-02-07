// 示例1

function MyObject (obj) {
  var foo = function () {}

  if (!obj) return (obj.method = foo)

  obj.method = foo
}

// 因为obj为undefied，foo没有被外部引用，执行性完后销毁
MyObject()

// 执行完匿名函数与MyObject()都不能被销毁，但由于传入的对象未被任何对象引用，因此随即还是会销毁
MyObject(new Object())

// 不会销毁，除非 手动将 foo 设置为 null
// 或者
// 重置：例如 obj.method = new Function()
// delete obj.method
// obj = null
let obj = new Object()
MyObject(obj)
