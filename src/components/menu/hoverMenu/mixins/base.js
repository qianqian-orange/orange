import Bus, { DOCUMENT_CONTEXT_MENU } from '@/utils/bus'

export default {
  mounted() {
    Bus.$on(DOCUMENT_CONTEXT_MENU, this.contextmenu)
  },
  beforeDestroy() {
    Bus.$off(DOCUMENT_CONTEXT_MENU, this.contextmenu)
  },
}
