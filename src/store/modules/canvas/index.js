import Vue from 'vue'
import lodash from 'lodash'
import {
  UPDATE_CANVAS_DATE,
  UPDATE_CANVAS_WIDGET_DATA,
  ADD_WIDGET,
} from './mutation-types'

const getters = {
  widgetList: ({ widgetListMap }) => Object.keys(widgetListMap).map(key => widgetListMap[key]),
}

const mutations = {
  [UPDATE_CANVAS_DATE](state, payload) {
    Object.keys(payload).forEach((key) => {
      state[key] = payload[key]
    })
  },
  [UPDATE_CANVAS_WIDGET_DATA]({ widgetListMap }, { id, ...rest }) {
    const item = widgetListMap[id]
    Object.keys(rest).forEach((key) => {
      item[key] = lodash.merge(item[key], rest[key])
    })
  },
  [ADD_WIDGET](state, widget) {
    Vue.set(state.widgetListMap, widget.id, widget)
  },
}

export default {
  namespaced: true,
  state: () => ({
    el: null,
    width: 0,
    height: 0,
    widgetListMap: {
      // 'a-button-1': {
      //   id: '${component}-${uid()}',
      //   component: 'a-button',
      //   prop: {
      //     type: 'primary',
      //   },
      //   text: '按钮',
      //   width: 0,
      //   height: 0,
      //   style: {},
      //   display: 'visible',
      // }
    },
  }),
  mutations,
  getters,
}
