import {
  UPDATE_WIDGET_DATA,
} from './mutation-types'

const getters = {
  widgetList: ({ widgetListMap }) => Object.keys(widgetListMap).map(key => widgetListMap[key]),
}

const mutations = {
  [UPDATE_WIDGET_DATA]({ widgetListMap }, { id, update }) {
    update(widgetListMap[id])
  },
}

export default {
  namespaced: true,
  state: () => ({
    widgetListMap: {
      'primary-button': {
        id: 'primary-button',
        display: 'visible',
        component: 'a-button',
        prop: {
          type: 'primary',
        },
        text: '按钮',
        style: {
          container: {},
          component: {},
        },
      },
      'search-primary-button': {
        id: 'search-primary-button',
        display: 'visible',
        component: 'a-button',
        prop: {
          type: 'primary',
          icon: 'search',
        },
        text: '搜索',
        style: {
          container: {},
          component: {},
        },
      },
    },
  }),
  mutations,
  getters,
}
