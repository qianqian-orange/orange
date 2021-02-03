import Bus, { DOCUMENT_CONTEXT_MENU } from '@/utils/bus'
import Menu from '@/components/menu/constructors/menu'

export const GET_MENU_INSTANCE = 'GET_MENU_INSTANCE'
export const MENU_INSTANCE = 'MENU_INSTANCE'

export default {
  data() {
    // 这里不推荐直接将menu绑定到vm实例上，因为menu属性中有target,event等对象，
    // 这些对象不应该做响应式处理，比较消耗性能
    const menu = new Menu({
      vm: this,
    })
    return {
      [GET_MENU_INSTANCE]: () => menu,
    }
  },
  computed: {
    [MENU_INSTANCE]() {
      return this[GET_MENU_INSTANCE]()
    },
  },
  mounted() {
    Bus.$on(DOCUMENT_CONTEXT_MENU, this.contextmenu)
  },
  beforeDestroy() {
    Bus.$off(DOCUMENT_CONTEXT_MENU, this.contextmenu)
    this[MENU_INSTANCE].destroy()
  },
}
