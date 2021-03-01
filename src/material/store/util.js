import store from '@/store'
import { isDev } from '@/config'
import { UPDATE_CANVAS_WIDGET_DATA } from '@/store/modules/canvas/mutation-types'
import { ADD_SNAPSHOT } from '@/store/modules/snapshot/mutation-types'

// 利用vue-devtools记录组件数据的变化，方便调试，但是在缩放改变时卡顿严重，生产环境一定要关掉
export function logger(update) {
  if (!isDev) return update
  return (...args) => {
    store.commit(`canvas/${UPDATE_CANVAS_WIDGET_DATA}`, {
      log: args[0] && args[0].log,
      update: (state) => {
        update(...args)
        state.widgets = this.widgets
      },
    })
  }
}

export const snapshot = {
  add({ undo, redo, free }) {
    store.commit(`snapshot/${ADD_SNAPSHOT}`, {
      undo: logger.call(this, undo),
      redo: logger.call(this, redo),
      free,
    })
  },
}
