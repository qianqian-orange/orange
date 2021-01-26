import DoubleLinkedList from '@/lib/dataStructure/doubleLinkedList'
import actions from './actions'
import mutations from './mutations'

export const doubleLinkedList = new DoubleLinkedList()
// mouseWidget id与linked node的映射
export const mouseWidgetMap = {}

const getters = {
  origin: (state, getter, rootState) => ({
    x: (parseInt(rootState.global.screen.width, 10) - parseInt(state.width, 10)) / 2,
    y: (parseInt(rootState.global.screen.height, 10) - parseInt(state.height, 10)) / 2,
  }),
}

export default {
  namespaced: true,
  state: () => ({
    width: '1440px', // 1440
    height: '1024px', // 1024
    mouseWidgetList: [],
  }),
  getters,
  actions,
  mutations,
}
