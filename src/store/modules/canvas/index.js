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
    /* eslint-disable */
    widgetListMap: {
      "a-button-1": {
        "component":"a-button",
        "prop":{
          "type":"primary",
          "icon":"search"
        },
        "text":"搜索",
        "width":82,
        "height":32,
        "id":"a-button-1",
        "style":{
          "position":"absolute",
          "top":"65px",
          "left":"200px"
        },
        "display":"visible"
      },
      "a-button-2":{
        "component":"a-button",
        "prop":{
          "type":"primary",
          "icon":"search"
        },
        "text":"搜索",
        "width":82,
        "height":32,
        "id":"a-button-2",
        "style":{
          "position":"absolute",
          "top":"203px",
          "left":"200px"
        },
        "display":"visible"
      },
      "a-button-3":{
        "component":"a-button",
        "prop":{
          "type":"primary"
        },
        "text":"按钮",
        "width":64,
        "height":32,
        "id":"a-button-3",
        "style":{
          "position":"absolute",
          "top":"128px",
          "left":"120px"
        },
        "display":"visible"
      },
      "a-button-4":{
        "component":"a-button",
        "prop":{
          "type":"primary",
          "icon":"search"
        },
        "text":"搜索",
        "width":82,
        "height":32,
        "id":"a-button-4",
        "style":{
          "position":"absolute",
          "zIndex":4,
          "top":"15px",
          "left":"200px"
        },
        "display":"visible"
      }
    },
    /* eslint-enable */
  }),
  mutations,
  getters,
}
