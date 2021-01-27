import Bus, { CANVAS_HOVER_MENU } from '@/utils/bus'
import { COORDINATE_DIRECTION_MAP } from '@/const/canvas'
import Menu from '@/components/menu/hoverMenu/menu'
import {
  showRuler,
  showLine,
  removeAllHorizontalLine,
  removeAllVerticalLine,
} from './config'
import base from '@/components/menu/hoverMenu/mixins/base'

const menu = new Menu()

export default {
  mixins: [base],
  methods: {
    contextmenu(evt) {
      if (!this.$el.contains(evt.target)) return
      // 设置数据源
      if (this.direction === COORDINATE_DIRECTION_MAP.xAxis) {
        menu.setData({
          items: [showRuler, showLine, removeAllHorizontalLine],
        })
      } else {
        menu.setData({
          items: [showRuler, showLine, removeAllVerticalLine],
        })
      }
      // 显示悬浮菜单
      Bus.$emit(CANVAS_HOVER_MENU, {
        menus: menu.items,
        position: {
          top: evt.clientY,
          left: evt.clientX,
        },
        width: '140px',
      })
    },
  },
}
