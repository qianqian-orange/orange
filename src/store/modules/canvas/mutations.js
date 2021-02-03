import {
  doubleLinkedList,
  mouseWidgetMap,
} from './index'
import {
  UPDATE_CANVAS_DATE,
  UPDATE_CANVAS_WIDGET_DATA,
  UPDATE_CANVAS_WIDGET_LIST_DATA,
} from './mutation-types'

export default {
  [UPDATE_CANVAS_DATE](state, { update }) {
    update(state)
  },
  [UPDATE_CANVAS_WIDGET_DATA](state, { id, update }) {
    const widget = mouseWidgetMap[id].data
    update({
      state,
      widget,
    })
  },
  [UPDATE_CANVAS_WIDGET_LIST_DATA](state) {
    state.mouseWidgetList = doubleLinkedList.toArray()
  },
}
