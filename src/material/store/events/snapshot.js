import {
  snapshot,
  logger,
} from '@/material/store/util'
import { ADD_SNAPSHOT } from '@/material/store/mutation-types'

export default {
  add() {
    this.on(ADD_SNAPSHOT, logger.call(this, ({ update, snapshot: { undo, redo, free } }) => {
      update(this)
      snapshot.add.call(this, {
        undo: () => { undo(this) },
        redo: () => { redo(this) },
        free,
      })
    }))
  },
}
