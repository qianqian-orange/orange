import { COORDINATE_DIRECTION_MAP } from '@/const/canvas'
import { MENU_SIZE } from '@/const/menu'
import { CONTEXTMENU } from 'ruler/const/event'
import context, {
  SHOW_RULER,
  SHOW_LINE,
  REMOVE_ALL_HORIZONTAL_LINE,
  REMOVE_ALL_VERTICAL_LINE,
} from './config'
import base, { MENU_INSTANCE } from '@/components/menu/hoverMenu/mixins/base'

// bar.vue用到这个mixin
export default {
  mixins: [base],
  mounted() {
    const menu = this[MENU_INSTANCE]
    const factory = context(menu)
    const showRuler = factory(SHOW_RULER)
    const showLine = factory(SHOW_LINE)
    if (this.direction === COORDINATE_DIRECTION_MAP.xAxis) {
      const removeAllHorizontalLine = factory(REMOVE_ALL_HORIZONTAL_LINE)
      menu.setData({
        items: [showRuler, showLine, removeAllHorizontalLine],
      })
    } else {
      const removeAllVerticalLine = factory(REMOVE_ALL_VERTICAL_LINE)
      menu.setData({
        items: [showRuler, showLine, removeAllVerticalLine],
      })
    }
  },
  methods: {
    contextmenu(evt) {
      if (!this.$el.contains(evt.target)) return
      // 显示悬浮菜单
      const menu = this[MENU_INSTANCE]
      this.store.emit(CONTEXTMENU, {
        menus: menu.items,
        position: {
          top: evt.clientY,
          left: evt.clientX,
        },
        size: MENU_SIZE.small,
        width: '140px',
      })
    },
  },
}
