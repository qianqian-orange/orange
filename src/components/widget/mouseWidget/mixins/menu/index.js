import Bus, {
  CANVAS_WIDGET_RESIZE,
  CANVAS_HOVER_MENU,
} from '@/utils/bus'
import Menu from '@/components/menu/hoverMenu/menu'
import {
  cut,
  copy,
  paste,
  remove,
  toTop,
  toBottom,
} from './config'
import base from '@/components/menu/hoverMenu/mixins/base'

const menu = new Menu()

export default {
  mixins: [base],
  methods: {
    contextmenu(evt) {
      const id = evt.target.id
      if (!id || id !== this.dataSource.id) return
      // 设置数据源
      menu.setData({
        target: this.dataSource,
        event: evt,
        items: [cut, copy, paste, remove, toTop, toBottom],
      })
      // 显示悬浮菜单
      Bus.$emit(CANVAS_HOVER_MENU, {
        menus: menu.items,
        position: {
          top: evt.clientY,
          left: evt.clientX,
        },
      })
      // 显示reizer
      Bus.$emit(CANVAS_WIDGET_RESIZE, evt.target)
    },
  },
}
