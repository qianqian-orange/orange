import store from '@/store'
import { noop } from '@/utils'
import {
  UPDATE_RULER_DATA,
  TOGGLE_REFERENCE_LINE_VISIBLE,
  DELETE_REFERENCE_LINE,
} from '@/store/modules/ruler/mutation-types'
import { COORDINATE_DIRECTION_MAP } from '@/const/canvas'
import MenuItem from '@/components/menu/constructors/menuItem'

export const showRuler = new MenuItem({
  title: '显示标尺',
  key: 'showRuler',
  glass: true,
  icon: {
    right: {
      className: 'icon-success',
      visible: true,
    },
  },
  events: {
    click() {
      store.commit(`ruler/${UPDATE_RULER_DATA}`, {
        log: {
          source: 'ruler -> menu',
          reason: '当点击右键菜单中显示标尺菜单项时隐藏标尺显示',
        },
        update: (state) => {
          state.visible = false
        },
      })
    },
  },
})

export const showLine = new MenuItem({
  title: '显示参考线',
  key: 'showLine',
  glass: true,
  icon: {
    right: {
      className: 'icon-success',
      visible: true,
    },
  },
  divider: true,
  events: {
    click() {
      this.icon.right.visible = !this.icon.right.visible
      store.commit(`ruler/${TOGGLE_REFERENCE_LINE_VISIBLE}`, this.icon.right.visible)
    },
  },
  dataSource: {
    watch: noop,
  },
  init() {
    this.dataSource.watch = store.watch((state) => state.ruler.referenceLine.visible, (visible) => {
      this.icon.right.visible = visible
    })
  },
  destroy() {
    this.dataSource.watch()
  },
})

export const removeAllHorizontalLine = new MenuItem({
  title: '删除所有纵向参考线',
  key: 'removeAllHorizontalLine',
  glass: true,
  props: {
    disabled: true,
  },
  events: {
    click() {
      store.commit(`ruler/${DELETE_REFERENCE_LINE}`, {
        direction: COORDINATE_DIRECTION_MAP.xAxis,
      })
    },
  },
  dataSource: {
    watch: noop,
  },
  init() {
    this.dataSource.watch = store.watch((state) => state.ruler.referenceLine[COORDINATE_DIRECTION_MAP.xAxis], (lines) => {
      this.props.disabled = !lines.length
    })
  },
  destroy() {
    this.dataSource.watch()
  },
})

export const removeAllVerticalLine = new MenuItem({
  title: '删除所有横向参考线',
  key: 'removeAllVerticalLine',
  glass: true,
  props: {
    disabled: true,
  },
  events: {
    click() {
      store.commit(`ruler/${DELETE_REFERENCE_LINE}`, {
        direction: COORDINATE_DIRECTION_MAP.yAxis,
      })
    },
  },
  dataSource: {
    watch: noop,
  },
  init() {
    this.dataSource.watch = store.watch((state) => state.ruler.referenceLine[COORDINATE_DIRECTION_MAP.yAxis], (lines) => {
      this.props.disabled = !lines.length
    })
  },
  destroy() {
    this.dataSource.watch()
  },
})
