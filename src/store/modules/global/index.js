import {
  UPDATE_GLOBAL_DATA,
} from './mutation-types'

const getters = {
  widgetList: ({ widgetListMap }) => Object.keys(widgetListMap).map(key => widgetListMap[key]),
}

const mutations = {
  [UPDATE_GLOBAL_DATA](state, { update }) {
    update(state)
  },
}

export default {
  namespaced: true,
  state: () => ({
    screen: {
      view: {
        width: 0,
        height: 0,
      },
      container: {
        width: '3000px',
        height: '1500px',
      },
    },
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
