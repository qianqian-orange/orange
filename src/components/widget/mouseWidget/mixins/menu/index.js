import Bus, {
  CANVAS_WIDGET_RESIZE,
  CANVAS_HOVER_MENU,
} from '@/utils/bus'
import {
  cut,
  copy,
  paste,
  remove,
  toTop,
  toBottom,
} from './config'
import base, { MENU_INSTANCE } from '@/components/menu/hoverMenu/mixins/base'

export default {
  mixins: [base],
  methods: {
    contextmenu(evt) {
      if (evt.target !== this.$el) return
      // 设置数据源
      const menu = this[MENU_INSTANCE]
      menu.setData({
        dataSource: this.dataSource,
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
