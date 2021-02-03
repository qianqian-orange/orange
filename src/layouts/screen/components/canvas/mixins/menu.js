import Bus, { CANVAS_HOVER_MENU } from '@/utils/bus'
import { paste } from '@/components/widget/mouseWidget/mixins/menu/config'
import base, { MENU_INSTANCE } from '@/components/menu/hoverMenu/mixins/base'

export default {
  mixins: [base],
  methods: {
    contextmenu(evt) {
      const identification = evt.target.dataset.identification
      if (!identification || identification !== this.identification) return
      // 设置数据源
      const menu = this[MENU_INSTANCE]
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
