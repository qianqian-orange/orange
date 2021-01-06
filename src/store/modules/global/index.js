import {
  UPDATE_WIDGET_DATA,
} from './mutation-types'

const getters = {
  widgetList: ({ widgetListMap }) => Object.keys(widgetListMap).map(key => ({
    ...widgetListMap[key],
    id: key,
  })),
}

const mutations = {
  [UPDATE_WIDGET_DATA]({ widgetListMap }, payload) {
    const widget = widgetListMap[payload.id]
    Object.keys(payload).forEach((key) => {
      widget[key] = payload[key]
    })
  },
}

export default {
  namespaced: true,
  state: () => ({
    widgetListMap: {
      'primary-button': {
        component: 'a-button',
        prop: {
          type: 'primary',
        },
        text: '按钮',
        width: 0,
        height: 0,
      },
      'search-primary-button': {
        component: 'a-button',
        prop: {
          type: 'primary',
          icon: 'search',
        },
        text: '搜索',
        width: 0,
        height: 0,
      },
    },
  }),
  mutations,
  getters,
}
