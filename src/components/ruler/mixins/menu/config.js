import { noop } from '@/utils'
import { COORDINATE_DIRECTION_MAP } from '@/const/canvas'
import MenuItem from '@/components/menu/constructors/menuItem'

export const SHOW_RULER = 'SHOW_RULER'
export const SHOW_LINE = 'SHOW_LINE'
export const REMOVE_ALL_HORIZONTAL_LINE = 'REMOVE_ALL_HORIZONTAL_LINE'
export const REMOVE_ALL_VERTICAL_LINE = 'REMOVE_ALL_VERTICAL_LINE'

const config = {
  [SHOW_RULER]: (menu) => new MenuItem({
    menu,
    title: '显示标尺',
    key: 'showRuler',
    icon: {
      right: {
        className: 'icon-success',
        visible: true,
      },
    },
    events: {
      click() {
        const { vm } = this.menu
        vm.store.update({
          update: (state) => {
            state.visible = false
          },
        })
      },
    },
  }),
  [SHOW_LINE]: (menu) => new MenuItem({
    menu,
    title: '显示参考线',
    key: 'showLine',
    icon: {
      right: {
        className: 'icon-success',
        visible: true,
      },
    },
    divider: true,
    events: {
      click() {
        const { vm } = this.menu
        const visible = this.icon.right.visible = !this.icon.right.visible
        vm.store.update({
          update: ({ referenceLine }) => {
            referenceLine.visible = visible
            referenceLine[COORDINATE_DIRECTION_MAP.xAxis]
              .concat(referenceLine[COORDINATE_DIRECTION_MAP.yAxis])
              .forEach((line) => {
                line.visible = visible
              })
          },
        })
      },
    },
    dataSource: {
      watch: noop,
    },
    init() {
      const { vm } = this.menu
      this.dataSource.unwatch = vm.$watch(
        () => vm.store.referenceLine.visible,
        (visible) => {
          this.icon.right.visible = visible
        },
      )
    },
    destroy() {
      this.dataSource.unwatch()
    },
  }),
  [REMOVE_ALL_HORIZONTAL_LINE]: (menu) => new MenuItem({
    menu,
    title: '删除所有纵向参考线',
    key: 'removeAllHorizontalLine',
    props: {
      disabled: true,
    },
    events: {
      click() {
        const { vm } = this.menu
        vm.store.remove(COORDINATE_DIRECTION_MAP.xAxis)
      },
    },
    dataSource: {
      watch: noop,
    },
    init() {
      const { vm } = this.menu
      this.dataSource.unwatch = vm.$watch(
        () => vm.store.referenceLine[COORDINATE_DIRECTION_MAP.xAxis],
        (lines) => {
          this.props.disabled = !lines.length
        },
      )
    },
    destroy() {
      this.dataSource.unwatch()
    },
  }),
  [REMOVE_ALL_VERTICAL_LINE]: (menu) => new MenuItem({
    menu,
    title: '删除所有横向参考线',
    key: 'removeAllVerticalLine',
    props: {
      disabled: true,
    },
    events: {
      click() {
        const { vm } = this.menu
        vm.store.remove(COORDINATE_DIRECTION_MAP.yAxis)
      },
    },
    dataSource: {
      watch: noop,
    },
    init() {
      const { vm } = this.menu
      this.dataSource.unwatch = vm.$watch(
        () => vm.store.referenceLine[COORDINATE_DIRECTION_MAP.yAxis],
        (lines) => {
          this.props.disabled = !lines.length
        },
      )
    },
    destroy() {
      this.dataSource.unwatch()
    },
  }),
}

export default (menu) => (type) => config[type](menu)
