import Bus, {
  CANVAS_HOVER_MENU,
  DOCUMENT_CONTEXT_MENU,
} from '@/utils/bus'
import menu, { paste } from '@/components/menu/hoverMenu/config'

export default {
  mounted() {
    Bus.$on(DOCUMENT_CONTEXT_MENU, this.contextmenu)
  },
  beforeDestroy() {
    Bus.$off(DOCUMENT_CONTEXT_MENU, this.contextmenu)
  },
  methods: {
    contextmenu(evt) {
      const identification = evt.target.dataset.identification
      if (!identification || identification !== this.identification) return
      // 设置数据源
      menu.setData({
        event: evt,
        items: [paste],
      })
      // 显示悬浮菜单
      Bus.$emit(CANVAS_HOVER_MENU, {
        menus: menu.items,
        position: {
          top: evt.clientY,
          left: evt.clientX,
        },
      })
    },
  },
}
