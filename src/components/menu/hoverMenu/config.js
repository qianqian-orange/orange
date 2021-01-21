import lodash from 'lodash'
import store from '@/store'
import Menu from '@/components/menu/hoverMenu/menu'
import MenuItem from '@/components/menu/hoverMenu/menuItem'
import uuid from '@/utils/uid'
import {
  TO_TOP,
  TO_BOTTOM,
  ADD_WIDGET,
  DELETE_WIDGET,
} from '@/store/modules/canvas/action-types'

const menu = new Menu()

export const cut = new MenuItem({
  title: '剪切',
  key: 'cut',
  events: {
    click() {
      store.dispatch(`canvas/${DELETE_WIDGET}`, menu.target.id)
    },
  },
})

export const copy = new MenuItem({
  title: '复制',
  key: 'copy',
})

const paste2canvas = new MenuItem({
  title: '到画布',
  key: 'paste2canvas',
  events: {
    click() {
      const widget = lodash.cloneDeep(paste.dataSource)
      widget.id = `${widget.component}-${uuid()}`
      store.dispatch(`canvas/${ADD_WIDGET}`, widget)
    },
  },
})

const paste2mouse = new MenuItem({
  title: '到鼠标位置',
  key: 'paste2mouse',
  events: {
    click() {
      const {
        offsetLeft,
        offsetTop,
      } = menu.event.target
      const {
        offsetX,
        offsetY,
      } = menu.event
      const widget = lodash.cloneDeep(paste.dataSource)
      widget.id = `${widget.component}-${uuid()}`
      widget.style.container.top = offsetTop + offsetY + 'px'
      widget.style.container.left = offsetLeft + offsetX + 'px'
      store.dispatch(`canvas/${ADD_WIDGET}`, widget)
    },
  },
})

export const paste = new MenuItem({
  title: '粘贴',
  key: 'paste',
  props: {
    popupClassName: 'hover-menu-popup',
    popupOffset: [0, -4],
    disabled: true,
  },
  init() {
    const fn = () => {
      this.dataSource = menu.target
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
  divider: true,
  events: {
    click() {
      store.dispatch(`canvas/${DELETE_WIDGET}`, menu.target.id)
    },
  },
})

export const toTop = new MenuItem({
  title: '置顶',
  key: 'toTop',
  events: {
    click() {
      store.dispatch(`canvas/${TO_TOP}`, menu.target.id)
    },
  },
})

export const toBottom = new MenuItem({
  title: '置底',
  key: 'toBottom',
  events: {
    click() {
      store.dispatch(`canvas/${TO_BOTTOM}`, menu.target.id)
    },
  },
})

export default menu
