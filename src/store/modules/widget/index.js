import {
  text,
  icon,
  rectangle,
  button,
  input,
  textarea,
  inputNumber,
  radio,
  checkbox,
  select,
  cascader,
  orangeSwitch,
} from '@/material/config'
import {
  UPDATE_WIDGET_DATA,
} from './mutation-types'

const getters = {
  widgetMap: state => Object.keys(state).reduce((res, cur) => ({ ...res, ...state[cur] }), {}),
}

const mutations = {
  [UPDATE_WIDGET_DATA](state, { update }) {
    update(state)
  },
}

export default {
  namespaced: true,
  state: () => ({
    text,
    icon,
    rectangle,
    button,
    input: {
      ...input,
      ...textarea,
    },
    inputNumber,
    radio,
    checkbox,
    select,
    cascader,
    orangeSwitch,
  }),
  getters,
  mutations,
}
