1. 只有一个形式参数不需要用括号

2. 如果函数只有一行，就不需要放到一个块中

3. 如果 return 语句是函数体内唯一的语句，就不需要 return 关键字

4. 箭头函数没有自己的 this, arguments, super, new.target, prototype

5. 箭头函数 this 只会从自己作用域链的上一层继承 this, 对箭头函数使用 bind, call, apply 不能绑定 this,只能传递参数
