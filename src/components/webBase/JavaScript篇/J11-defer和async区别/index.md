1. 都只对外部脚本文件有效
2. 都会告诉浏览器立即开始下载

defer

1. 如果有多个外部脚本，脚本按照顺序执行（实际中不一定，最后只有一个脚本用这种方式）
2. DOMContentLoaded 事件之前执行（实际中不一定）
3. XHTML 文档中要写成 deder="defer"

async

1. 不保证顺序
2. 在 load 事件前，DOMContentLoaded 事件前或者后
3. 不建议用
