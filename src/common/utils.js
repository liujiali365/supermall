export function debounce(func, delay) {
  let timer = null          // 如果有引用，则原函数结束后不会被删除
  // setTimeout(() => {}) 里面的函数是在本次事件循环执行完之后才执行，就算不写延迟时间，里面的函数也是最后执行的。
  return function(...args) {
    if(timer) clearTimeout(timer)

    timer = setTimeout(() => {
        func.apply(this, args)
        // console.log(args);
       }, delay)
  }
}