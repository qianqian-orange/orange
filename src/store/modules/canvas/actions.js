import Bus, {
  CANVAS_WIDGET_BOOTSTRAP,
  CANVAS_WIDGET_RESIZE,
} from '@/utils/bus'
import {
  doubleLinkedList,
  mouseWidgetMap,
} from './index'
import {
  UPDATE_CANVAS_WIDGET_DATA,
  UPDATE_CANVAS_WIDGET_LIST_DATA,
} from './mutation-types'
import {
  TO_TOP,
  TO_BOTTOM,
  ADD_WIDGET,
  DELETE_WIDGET,
  ADD_CANVAS_WIDGET_UPDATE_SNAPSHOT,
} from './action-types'
import { ADD_SNAPSHOT } from '@/store/modules/snapshot/mutation-types'

function add(commit, widget) {
  mouseWidgetMap[widget.id] = doubleLinkedList.add(widget)
  commit(UPDATE_CANVAS_WIDGET_LIST_DATA)
}

function remove(commit, id) {
  doubleLinkedList.remove(mouseWidgetMap[id])
  delete mouseWidgetMap[id]
  commit(UPDATE_CANVAS_WIDGET_LIST_DATA)
}

const bootstrap = (vm) => {
  Bus.$emit(CANVAS_WIDGET_RESIZE, vm.$el)
  Bus.$off(CANVAS_WIDGET_BOOTSTRAP, bootstrap)
}

export default {
  [TO_TOP]({ commit }, id) {
    const node = mouseWidgetMap[id]
    if (doubleLinkedList.head === node) {
      doubleLinkedList.head = node.next
      commit(UPDATE_CANVAS_WIDGET_LIST_DATA)
      commit(`snapshot/${ADD_SNAPSHOT}`, {
        undo: () => {
          doubleLinkedList.head = node
          commit(UPDATE_CANVAS_WIDGET_LIST_DATA)
        },
        redo: () => {
          doubleLinkedList.head = node.next
          commit(UPDATE_CANVAS_WIDGET_LIST_DATA)
        },
      }, { root: true })
      return
    }
    const { next } = node
    doubleLinkedList.move(node, doubleLinkedList.head)
    commit(UPDATE_CANVAS_WIDGET_LIST_DATA)
    commit(`snapshot/${ADD_SNAPSHOT}`, {
      undo: () => {
        doubleLinkedList.move(node, next)
        commit(UPDATE_CANVAS_WIDGET_LIST_DATA)
      },
      redo: () => {
        doubleLinkedList.move(node, doubleLinkedList.head)
        commit(UPDATE_CANVAS_WIDGET_LIST_DATA)
      },
    }, { root: true })
  },
  [TO_BOTTOM]({ commit }, id) {
    const node = mouseWidgetMap[id]
    const head = doubleLinkedList.head
    doubleLinkedList.head = node
    commit(UPDATE_CANVAS_WIDGET_LIST_DATA)
    commit(`snapshot/${ADD_SNAPSHOT}`, {
      undo: () => {
        doubleLinkedList.head = head
        commit(UPDATE_CANVAS_WIDGET_LIST_DATA)
      },
      redo: () => {
        doubleLinkedList.head = node
        commit(UPDATE_CANVAS_WIDGET_LIST_DATA)
      },
    }, { root: true })
  },
  [ADD_WIDGET]({ commit }, widget) {
    add(commit, widget)
    // 在新增组件mouted时显示resizer
    Bus.$on(CANVAS_WIDGET_BOOTSTRAP, bootstrap)
    commit(`snapshot/${ADD_SNAPSHOT}`, {
      undo: () => {
        remove(commit, widget.id)
      },
      redo: () => {
        add(commit, widget)
      },
    }, { root: true })
  },
  [DELETE_WIDGET]({ commit }, id) {
    const widget = mouseWidgetMap[id].data
    remove(commit, id)
    commit(`snapshot/${ADD_SNAPSHOT}`, {
      undo: () => {
        add(commit, widget)
      },
      redo: () => {
        remove(commit, id)
      },
    }, { root: true })
  },
  [ADD_CANVAS_WIDGET_UPDATE_SNAPSHOT]({ commit }, { id, update, snapshot: { undo, redo, free } }) {
    commit(UPDATE_CANVAS_WIDGET_DATA, { id, update })
    commit(`snapshot/${ADD_SNAPSHOT}`, {
      undo: () => { commit(UPDATE_CANVAS_WIDGET_DATA, { id, update: undo }) },
      redo: () => { commit(UPDATE_CANVAS_WIDGET_DATA, { id, update: redo || update }) },
      free,
    }, { root: true })
  },
}
