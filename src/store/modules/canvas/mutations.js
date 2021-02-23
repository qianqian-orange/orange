import {
  UPDATE_CANVAS_DATA,
  UPDATE_CANVAS_WIDGET_DATA,
} from './mutation-types'

export default {
  [UPDATE_CANVAS_DATA](state, { update }) {
    update(state)
  },
  [UPDATE_CANVAS_WIDGET_DATA](state, { update }) {
    update(state)
  },
}
