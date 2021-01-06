import {
  ADD_SNAPSHOT,
  UNDO,
  REDO,
} from './mutation-types'

const getters = {
  undoEnable: ({ step }) => step > 0,
  redoEnable: ({ step, snapshots }) => step < snapshots.length,
}

const mutations = {
  [ADD_SNAPSHOT](state, snapshot) {
    const deleteCount = state.snapshots.length - state.step
    if (!deleteCount && state.snapshots.length === state.max) {
      state.snapshots.shift()
      state.snapshots.push(snapshot)
      return
    }
    state.snapshots.splice(state.step, deleteCount, snapshot)
      .forEach(({ free }) => {
        // 将闭包变量释放，防止内存泄漏
        free()
      })
    state.step += 1
  },
  [UNDO](state) {
    if (state.step === 0) return
    const { undo } = state.snapshots[state.step - 1]
    undo()
    state.step -= 1
  },
  [REDO](state) {
    if (state.step === state.snapshots.length) return
    const { redo } = state.snapshots[state.step]
    redo()
    state.step += 1
  },
}

export default {
  namespaced: true,
  state: () => ({
    step: 0,
    snapshots: [],
    max: 20, // 保留的快照上限数量
  }),
  mutations,
  getters,
}
