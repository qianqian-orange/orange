import { MENU_DEFAULT_WIDTH, MENU_SIZE } from '@/const/menu'

export default {
  props: {
    width: {
      type: String,
      default: MENU_DEFAULT_WIDTH,
    },
    size: {
      type: String,
      default: MENU_SIZE.normal,
    },
    menus: {
      type: Array,
      default: () => [],
    },
  },
}
