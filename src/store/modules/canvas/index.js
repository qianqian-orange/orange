import { CANVAS_MINIMUM_INTERVAL } from '@/const/canvas'
import DoubleLinkedList from '@/lib/dataStructure/doubleLinkedList'
import actions from './actions'
import mutations from './mutations'

export const doubleLinkedList = new DoubleLinkedList()
// mouseWidget id与linked node的映射
export const mouseWidgetMap = {}

const getters = {
  origin: (state, getter, {
    global: { screen: { container } },
  }) => ({
    x: Math.floor((parseInt(container.width, 10) - parseInt(state.width, 10)) / 2),
    y: Math.floor((parseInt(container.height, 10) - parseInt(state.height, 10)) / 2),
  }),
}

export default {
  namespaced: true,
  state: () => ({
    width: '1440px', // 1440
    height: '1024px', // 1024
    interval: CANVAS_MINIMUM_INTERVAL, // 最小区间间隔
    zoom: 1, // 画布缩放因子
    zIndex: 1, // 记录组件的z-index样式值
    mouseWidgetList: [],
  }),
  getters,
  actions,
  mutations,
}
