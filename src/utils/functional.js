// 组合函数，执行顺序从右到左
export const compose = (...fns) => fns.reduce((a, b) => (...args) => a(b(...args)))
