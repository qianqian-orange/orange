import Vue from 'vue'
import { ADD_MOUSEMOVE_HANDLER } from './mutation-types'

const getters = {
  mousemoveHandlers: ({ mousemoveHandlerMap }) => Object.keys(mousemoveHandlerMap)
    .map(key => mousemoveHandlerMap[key]),
}

const mutations = {
  [ADD_MOUSEMOVE_HANDLER]({ mousemoveHandlerMap }, { id, fn }) {
    Vue.set(mousemoveHandlerMap, id, fn)
  },
}

export default {
  namespaced: true,
  state: () => ({
    mousemoveHandlerMap: {},
  }),
  mutations,
  getters,
}
