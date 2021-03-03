export default (events, vm) => {
  const map = {}
  events.forEach(({ event, code }) => {
    if (!map[event]) map[event] = []
    map[event].push(code)
  })
  return Object.keys(map).reduce((res, event) => {
    res[event] = () => {
      ;(0, eval)(`;(function (vm) {
        ${map[event].reduce((res, code) => res + code, '')}
      }).bind(window['${vm.id}'])(window['${vm.id}'])`)
    }
    return res
  }, {})
}
