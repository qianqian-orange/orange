import store from '@/store'
import { noop } from '@/utils'
import MenuItem from '@/components/menu/constructors/menuItem'
import { UPDATE_CANVAS_DATE } from '@/store/modules/canvas/mutation-types'

function update(zoom, log) {
  store.commit(`canvas/${UPDATE_CANVAS_DATE}`, {
    log: {
      source: 'zoom -> menu',
      reason: `当点击缩放菜单的${log}子菜单项时需要更改zoom值`,
    },
    update: (state) => {
      state.zoom = zoom
    },
  })
}

export const enlarge = new MenuItem({
  title: '放大',
  key: 'enlarge',
  events: {
    click() {
      console.log('放大')
    },
  },
})

export const narrow = new MenuItem({
  title: '缩小',
  key: 'narrow',
  divider: true,
  events: {
    click() {
      update(0.5, '50%')
    },
  },
})

export const zoom50 = new MenuItem({
  title: '50%',
  key: 'zoom50',
  icon: {
    left: {
      className: 'icon-success',
      visible: false,
    },
  },
  dataSource: {
    zoom: 0.5,
    watch: noop,
  },
  events: {
    click() {
      update(this.dataSource.zoom, '50%')
    },
  },
  init() {
    this.dataSource.watch = store.watch((state) => state.canvas.zoom, (zoom) => {
      this.icon.left.visible = zoom === this.dataSource.zoom
    })
  },
  destroy() {
    this.dataSource.watch()
  },
})

export const zoom100 = new MenuItem({
  title: '100%',
  key: 'zoom100',
  icon: {
    left: {
      className: 'icon-success',
      visible: true,
    },
  },
  dataSource: {
    zoom: 1,
    watch: noop,
  },
  events: {
    click() {
      update(this.dataSource.zoom, '100%')
    },
  },
  init() {
    store.watch((state) => state.canvas.zoom, (zoom) => {
      this.icon.left.visible = zoom === this.dataSource.zoom
    })
  },
  destroy() {
    this.dataSource.watch()
  },
})

export const zoom200 = new MenuItem({
  title: '200%',
  key: 'zoom200',
  divider: true,
  icon: {
    left: {
      className: 'icon-success',
      visible: false,
    },
  },
  dataSource: {
    zoom: 2,
    watch: noop,
  },
  events: {
    click() {
      update(this.dataSource.zoom, '200%')
    },
  },
  init() {
    store.watch((state) => state.canvas.zoom, (zoom) => {
      this.icon.left.visible = zoom === this.dataSource.zoom
    })
  },
  destroy() {
    this.dataSource.watch()
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
