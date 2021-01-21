import DoubleLinkedList from '@/lib/dataStructure/doubleLinkedList'
import actions from './actions'
import mutations from './mutations'

export const doubleLinkedList = new DoubleLinkedList()
// mouseWidget id与linked node的映射
export const mouseWidgetMap = {}

export default {
  namespaced: true,
  state: () => ({
    width: 0,
    height: 0,
    mouseWidgetList: [],
  }),
  actions,
  mutations,
}
