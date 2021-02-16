import store from '@/store'
import MenuItem from '@/components/menu/constructors/menuItem'
import uuid from '@/utils/uid'
import {
  TO_TOP,
  TO_BOTTOM,
  ADD_WIDGET,
  DELETE_WIDGET,
} from '@/store/modules/canvas/action-types'

export const cut = new MenuItem({
  title: '剪切',
  key: 'cut',
  glass: true,
  events: {
    click() {
      store.dispatch(`canvas/${DELETE_WIDGET}`, this.menu.target.id)
    },
  },
})

export const copy = new MenuItem({
  title: '复制',
  key: 'copy',
  glass: true,
})

const paste2canvas = new MenuItem({
  title: '到画布',
  key: 'paste2canvas',
  glass: true,
  events: {
    click() {
      const widget = paste.dataSource.clone()
      widget.id = `${widget.component}-${uuid()}`
      store.dispatch(`canvas/${ADD_WIDGET}`, widget)
    },
  },
})

const paste2mouse = new MenuItem({
  title: '到鼠标位置',
  key: 'paste2mouse',
  glass: true,
  events: {
    click() {
      // 当粘贴的触发时机是在某个组件内那offsetLeft,offsetTop就可以用到了
      const {
        offsetLeft,
        offsetTop,
      } = this.menu.event.target
      const {
        offsetX,
        offsetY,
      } = this.menu.event
      const widget = paste.dataSource.clone()
      widget.id = `${widget.component}-${uuid()}`
      const { container } = widget.style
      container.top = offsetTop + offsetY + 'px'
      container.left = offsetLeft + offsetX + 'px'
      // 上面设置的top和left值已经是根据符合当前画布的缩放因子下的位置，
      // 所以添加这个组件的时候就不需要在进行位置调整了
      container.transform = `scale(${store.state.canvas.zoom})`
      store.dispatch(`canvas/${ADD_WIDGET}`, widget)
    },
  },
})

export const paste = new MenuItem({
  title: '粘贴',
  key: 'paste',
  props: {
    disabled: true,
  },
  init() {
    const fn = () => {
      this.dataSource = this.menu.target
      this.props.disabled = false
    }
    cut.on('click', fn)
    copy.on('click', fn)
  },
  children: [
    paste2canvas,
    paste2mouse,
  ],
})

export const remove = new MenuItem({
  title: '删除',
  key: 'remove',
  glass: true,
  divider: true,
  events: {
    click() {
      store.dispatch(`canvas/${DELETE_WIDGET}`, this.menu.target.id)
    },
  },
})

export const toTop = new MenuItem({
  title: '置顶',
  key: 'toTop',
  glass: true,
  events: {
    click() {
      store.dispatch(`canvas/${TO_TOP}`, this.menu.target.id)
    },
  },
})

export const toBottom = new MenuItem({
  title: '置底',
  key: 'toBottom',
  glass: true,
  events: {
    click() {
      store.dispatch(`canvas/${TO_BOTTOM}`, this.menu.target.id)
    },
  },
})
