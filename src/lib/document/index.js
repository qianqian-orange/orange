import { on } from '@/utils/dom'
import Bus, {
  DOCUMENT_MOUSE_DOWN,
  DOCUMENT_MOUSE_MOVE,
  DOCUMENT_MOUSE_UP,
  DOCUMENT_CONTEXT_MENU,
} from '@/utils/bus'

let target = null
// 判断是否有触发mousemove事件
let move = false

function contextmenu(evt) {
  evt.preventDefault()
  Bus.$emit(DOCUMENT_CONTEXT_MENU, evt)
}

function mousedown(evt) {
  Bus.$emit(DOCUMENT_MOUSE_DOWN, evt)
}

function mousemove(evt) {
  if (!target) return
  move = true
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
  Bus.$emit(DOCUMENT_MOUSE_MOVE, target, evt)
}

function mouseup(evt) {
  // 由于事件冒泡会导致此方法被调用，当target为null时不做处理
  if (!target) return
  Bus.$emit(DOCUMENT_MOUSE_UP, target, move, evt)
  move = false
  target = null
}

function init() {
  on(document, 'contextmenu', contextmenu)
  on(document, 'mousedown', mousedown)
  on(document, 'mousemove', mousemove)
  on(document, 'mouseup', mouseup)
}

init()

export function setTarget(el) {
  target = el
}

export function getTarget() {
  return target
}
