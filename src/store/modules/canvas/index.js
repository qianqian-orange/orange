import { CANVAS_MINIMUM_INTERVAL } from '@/const/canvas'
import DoubleLinkedList from '@/lib/dataStructure/doubleLinkedList'
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
    grid: true, // 是否显示网格
    widgets: [], // 这个属性的作用是便于调试
  }),
  getters,
  mutations,
}
