import { splice } from '@/utils/array'
import { COORDINATE_DIRECTION_MAP } from '@/const/canvas'
import {
  UPDATE_RULER_DATA,
  ADD_REFERENCE_LINE,
  DELETE_REFERENCE_LINE,
  TOGGLE_REFERENCE_LINE_VISIBLE,
} from './mutation-types'

function toggleReferenceLineVisible(referenceLine, visible) {
  referenceLine.visible = visible
  referenceLine[COORDINATE_DIRECTION_MAP.xAxis].forEach((line) => {
    line.visible = visible
  })
  referenceLine[COORDINATE_DIRECTION_MAP.yAxis].forEach((line) => {
    line.visible = visible
  })
}

const mutations = {
  [UPDATE_RULER_DATA](state, { update }) {
    update(state)
  },
  [TOGGLE_REFERENCE_LINE_VISIBLE]({ referenceLine }, visible) {
    toggleReferenceLineVisible(referenceLine, visible)
  },
  [ADD_REFERENCE_LINE]({ referenceLine }, { direction, line }) {
    referenceLine[direction].push(line)
    toggleReferenceLineVisible(referenceLine, true)
  },
  [DELETE_REFERENCE_LINE]({ referenceLine }, { direction, index }) {
    if (typeof index === 'number') splice(referenceLine[direction], index)
    else referenceLine[direction] = []
  },
}

export default {
  namespaced: true,
  state: () => ({
    view: { // 刻度尺的视图尺寸
      width: 0,
      height: 0,
    },
    visible: true, // 全局控制刻度尺的显示
    size: 18, // 刻度值的宽高尺寸，对于x轴而言是定义高的长度，对于y轴而言是定义宽的长度
    referenceLine: {
      visible: true, // 全局控制参考线的显示
      [COORDINATE_DIRECTION_MAP.xAxis]: [], // 保存x轴的参考线
      [COORDINATE_DIRECTION_MAP.yAxis]: [], // 保存y轴的参考线
    },
  }),
  mutations,
}
