import Bus, {
  CANVAS_WIDGET_RESIZE,
  CANVAS_HOVER_MENU,
  DOCUMENT_CONTEXT_MENU,
} from '@/utils/bus'
import menu, {
  cut,
  copy,
  paste,
  remove,
  toTop,
  toBottom,
} from '@/components/menu/hoverMenu/config'

export default {
  mounted() {
    Bus.$on(DOCUMENT_CONTEXT_MENU, this.contextmenu)
  },
  beforeDestroy() {
    Bus.$off(DOCUMENT_CONTEXT_MENU, this.contextmenu)
  },
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
