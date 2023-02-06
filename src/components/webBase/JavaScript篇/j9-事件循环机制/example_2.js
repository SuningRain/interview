Promise.resolve().then(() => {
  console.log('第一个回调函数：微任务1')
  setTimeout(() => {
    console.log('第三个回调函数：宏任务2')
  }, 0)
})
setTimeout(() => {
  console.log('第二个回调函数：宏任务1')
  Promise.resolve().then(() => {
    console.log('第四个回调函数：微任务2')
  })
}, 0)
// 第一个回调函数：微任务1
// 第二个回调函数：宏任务1
// 第四个回调函数：微任务2
// 第三个回调函数：宏任务2
