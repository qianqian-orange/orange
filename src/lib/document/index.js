let target = null

export const mousemoveQueue = []
export const mouseupQueue = []

function mousemove(evt) {
  if (!target) return
  const {
    startX,
    startY,
    clientX,
    clientY,
  } = target.position
  const left = startX + (evt.clientX - clientX)
  const top = startY + (evt.clientY - clientY)
  target.style.top = top + 'px'
  target.style.left = left + 'px'
  mousemoveQueue.forEach(fn => fn(target, evt))
}

function mouseup(evt) {
  // 由于事件冒泡会导致此方法被调用，当target为null时不做处理
  if (!target) return
  mouseupQueue.forEach(fn => fn(target, evt))
  target = null
}

function init() {
  document.addEventListener('mousemove', mousemove)
  document.addEventListener('mouseup', mouseup)
}

init()

export function setTarget(el) {
  target = el
}

export function getTarget() {
  return target
}
