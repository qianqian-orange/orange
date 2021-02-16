import button from './config/button'
import icon from './config/icon'
import text from './config/text'
import {
  UPDATE_WIDGET_DATA,
} from './mutation-types'

const mutations = {
  [UPDATE_WIDGET_DATA](state, { update }) {
    update(state)
  },
}

export default {
  namespaced: true,
  state: () => ({
    button,
    icon,
    text,
  }),
  mutations,
}
