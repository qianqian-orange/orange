import Bus, { SCREEN_SCROLL, SCREEN_SCROLL_END } from '@/utils/bus'

export default {
  methods: {
    scroll(evt) {
      Bus.$emit(SCREEN_SCROLL, evt)
    },
    scrollEnd() {
      Bus.$emit(SCREEN_SCROLL_END)
    },
    scrollTo(x, y) {
      this.$refs.scrollbar.scrollTo(x, y)
    },
  },
}
