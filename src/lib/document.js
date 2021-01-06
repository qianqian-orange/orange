import store from '@/store'
import { ADD_SNAPSHOT } from '@/store/modules/snapshot/mutation-types'
import { UPDATE_CANVAS_WIDGET_DATA } from '@/store/modules/canvas/mutation-types'

let target = null

function mousemove(evt) {
  if (!target) return
  const {
    startX,
    startY,
    clientX,
    clientY,
  } = target.position
  target.style.left = startX + evt.clientX - clientX + 'px'
  target.style.top = startY + evt.clientY - clientY + 'px'
  store.getters['document/mousemoveHandlers'].forEach(fn => fn(target))
}

function mouseup() {
  // 由于事件冒泡会导致此方法被调用，所以这里加一个判断
  if (!target) return
  const {
    startX,
    startY,
  } = target.position
  const {
    left,
    top,
  } = target.style
  ;((target) => {
    if (startX === parseInt(left) && startY === parseInt(top)) return
    const updateWidgetData = (data) => {
      store.commit(`canvas/${UPDATE_CANVAS_WIDGET_DATA}`, {
        id: target.id,
        ...data,
      })
    }
    updateWidgetData({
      style: {
        top,
        left,
      },
    })
    store.commit(`snapshot/${ADD_SNAPSHOT}`, {
      undo: () => {
        updateWidgetData({
          style: {
            top: startY + 'px',
            left: startX + 'px',
          },
        })
      },
      redo: () => {
        updateWidgetData({
          style: {
            top,
            left,
          },
        })
      },
      free: () => {
        target = null
      },
    })
  })(target)
  target = null
}

function init() {
  document.addEventListener('mousemove', mousemove)
  document.addEventListener('mouseup', mouseup)
}

init()

export function setTarget(t) {
  target = t
}
