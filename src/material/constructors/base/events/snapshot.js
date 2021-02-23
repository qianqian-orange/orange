import store from '@/material/store'
import { ADD_SNAPSHOT } from '@/material/store/mutation-types'

// 目的：为了目标组件对应的数据源
export function snapshot() {
  this.container.on('snapshot', ({ log, update, snapshot: { undo, redo, free } }) => {
    store.emit(ADD_SNAPSHOT, {
      log,
      update: (state) => { update({ state, widget: this }) },
      snapshot: {
        undo: (state) => { undo({ state, widget: this }) },
        redo: (state) => { redo({ state, widget: this }) },
        free: free,
      },
    })
  })
}
