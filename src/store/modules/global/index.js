import {
  UPDATE_GLOBAL_DATA,
} from './mutation-types'

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
  }),
  mutations,
}
