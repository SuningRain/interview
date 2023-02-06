// 描述下面代码的运行结构

const first = () => {
  return new Promise((resolve, reject) => {
    console.log('同步代码' + 3)
    let p = new Promise((resolve, reject) => {
      console.log('同步代码' + 7)
      setTimeout(() => {
        console.log('宏任务' + 1)
      }, 0)
      setTimeout(() => {
        console.log('宏任务' + 2)
        resolve(3) // 这段代码执行不会触发then回调，因为Promise类似于状态机,resolve(4)会优先于它执行，提前将done设置为true
      }, 0)
      resolve(4)
    })
    resolve(2)
    p.then(arg => {
      console.log(arg, 5, '微任务') // 1 bb
    })
    setTimeout(() => {
      console.log('宏任务' + 6)
    }, 0)
  })
}
first().then(arg => {
  console.log(arg, 7, '微任务') // 2 aa
  setTimeout(() => {
    console.log('宏任务' + 8)
  }, 0)
})
setTimeout(() => {
  console.log('宏任务' + 9)
}, 0)
console.log('同步代码' + 10)

// 结果

// 同步代码 3
// 同步代码 7
// 同步代码 10
// 4 5 '微任务'
// 2 7 '微任务'
// 宏任务 1
// 宏任务 2
// 宏任务 6
// 宏任务 9
// 宏任务 8
