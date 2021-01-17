import Vue from 'vue'
import {
  UPDATE_CANVAS_DATE,
  UPDATE_CANVAS_WIDGET_DATA,
  ADD_WIDGET,
} from './mutation-types'

const getters = {
  widgetList: ({ widgetListMap }) => Object.keys(widgetListMap).map(key => widgetListMap[key]),
}

const mutations = {
  [UPDATE_CANVAS_DATE](state, update) {
    update(state)
  },
  [UPDATE_CANVAS_WIDGET_DATA]({ widgetListMap }, { id, update }) {
    update(widgetListMap[id])
  },
  [ADD_WIDGET](state, widget) {
    Vue.set(state.widgetListMap, widget.id, widget)
  },
}

export default {
  namespaced: true,
  state: () => ({
    width: 0,
    height: 0,
    /* eslint-disable */
    widgetListMap: {
      // "a-button-1": {
      //   "component":"a-button",
      //   "prop":{
      //     "type":"primary",
      //     "icon":"search"
      //   },
      //   "text":"搜索",
      //   "width":82,
      //   "height":32,
      //   "id":"a-button-1",
      //   "style":{
      //     "position":"absolute",
      //     "width": "82px",
      //     "height": "32px",
      //     "top":"65px",
      //     "left":"200px"
      //   },
      //   "display":"visible"
      // },
    },
    /* eslint-enable */
  }),
  mutations,
  getters,
}
