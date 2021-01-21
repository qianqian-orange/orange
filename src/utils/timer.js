export const sleep = (delay) => new Promise((resolve) => {
  const timer = setTimeout(() => {
    clearTimeout(timer)
    resolve()
  }, delay)
})
