import vuexStore from '@/store'
import materialStore from '@/material/store'
import { noop } from '@/utils'
import MenuItem from '@/components/menu/constructors/menuItem'
import { UPDATE_GLOBAL_DATA } from '@/store/modules/global/mutation-types'
import { UPDATE_CANVAS_DATA } from '@/store/modules/canvas/mutation-types'
import { UPDATE_WIDGET } from '@/material/store/mutation-types'

function update(zoom, log) {
  vuexStore.commit(`global/${UPDATE_GLOBAL_DATA}`, {
    log: {
      source: 'zoom -> menu',
      reason: `当点击缩放菜单的${log}子菜单项时需要更改屏幕容器宽高`,
    },
    update: ({ screen: { container } }) => {
      const percent = zoom / vuexStore.state.canvas.zoom
      container.width = parseInt(container.width) * percent + 'px'
      container.height = parseInt(container.height) * percent + 'px'
    },
  })

  vuexStore.commit(`canvas/${UPDATE_CANVAS_DATA}`, {
    log: {
      source: 'zoom -> menu',
      reason: `当点击缩放菜单的${log}子菜单项时需要更改zoom值和画布宽高`,
    },
    update: (state) => {
      const percent = zoom / state.zoom
      state.zoom = zoom
      state.width = parseInt(state.width) * percent + 'px'
      state.height = parseInt(state.height) * percent + 'px'
    },
  })

  materialStore.emit(UPDATE_WIDGET, {
    log: {
      source: 'zoom -> menu',
      reason: '修改组件缩放因子值',
    },
    update: (state) => {
      state.widgets.forEach((widget) => {
        widget.zoom = zoom
      })
    },
  })
}

export const enlarge = new MenuItem({
  title: '放大',
  key: 'enlarge',
  events: {
    click() {
    },
  },
})

export const narrow = new MenuItem({
  title: '缩小',
  key: 'narrow',
  divider: true,
  events: {
    click() {
    },
  },
})

export const fitCavnas = new MenuItem({
  title: '适应画布',
  key: 'fitCavnas',
  events: {
    click() {
    },
  },
})

export const zoom2area = new MenuItem({
  title: '缩放至选区',
  key: 'zoom2area',
  events: {
    click() {
    },
  },
})

const factory = (zoom) => new MenuItem({
  title: `${zoom * 100}%`,
  key: `zoom${zoom * 100}`,
  icon: {
    left: {
      type: 'check',
      visible: false,
    },
  },
  dataSource: {
    zoom,
    watch: noop,
  },
  events: {
    click() {
      update(this.dataSource.zoom, `${zoom * 100}%`)
    },
  },
  init() {
    this.dataSource.unwatch = vuexStore.watch((state) => state.canvas.zoom, (zoom) => {
      this.icon.left.visible = zoom === this.dataSource.zoom
    })
  },
  destroy() {
    this.dataSource.unwatch()
  },
})

export const zoom50 = factory(0.5)

export const zoom100 = factory(1)
zoom100.icon.left.visible = true

export const zoom200 = factory(2)
