<template>
  <ruler
    ref="ruler"
    :start-x="startX"
    :start-y="startY"
    @back="back"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import Bus, { SCREEN_SCROLL, SCREEN_SCROLL_END } from '@/utils/bus'
import Ruler from '@/components/ruler'

export default {
  name: 'ScreenRuler',
  components: {
    Ruler,
  },
  data() {
    return {
      startX: 0,
      startY: 0,
    }
  },
  computed: {
    ...mapGetters('canvas', ['origin']),
  },
  mounted() {
    // 先监听滚动事件在执行返回原点逻辑
    Bus.$on(SCREEN_SCROLL, this.scroll)
    Bus.$on(SCREEN_SCROLL_END, this.scrollEnd)
    this.back()
  },
  beforeDestroy() {
    Bus.$off(SCREEN_SCROLL, this.scroll)
    Bus.$off(SCREEN_SCROLL_END, this.scrollEnd)
  },
  methods: {
    scroll(evt) {
      const target = evt.target
      this.startX = target.scrollLeft - this.origin.x
      this.startY = target.scrollTop - this.origin.y
    },
    scrollEnd() {
      this.$refs.ruler.scrollEnd()
    },
    back() {
      this.$emit('scroll-to', this.origin.x, this.origin.y)
    },
  },
}
</script>
