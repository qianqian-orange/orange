import Bus, { CANVAS_HOVER_MENU } from '@/utils/bus'
import Menu from '@/components/menu/hoverMenu/menu'
import { paste } from '@/components/widget/mouseWidget/mixins/menu/config'
import base from '@/components/menu/hoverMenu/mixins/base'

const menu = new Menu()

export default {
  mixins: [base],
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
