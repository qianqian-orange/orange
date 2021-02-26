<template>
  <ruler
    ref="ruler"
    :offset-x="offsetX"
    :offset-y="offsetY"
    :rect="rect"
    :zoom="zoom"
    :size="`${size}px`"
    @back="back"
  />
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Bus, {
  SCREEN_SCROLL,
  SCREEN_SCROLL_END,
} from '@/utils/bus'
import Ruler from '@/components/ruler'

export default {
  name: 'ScreenRuler',
  components: {
    Ruler,
  },
  data() {
    return {
      size: 16,
      offsetX: 0,
      offsetY: 0,
    }
  },
  computed: {
    rect() {
      const {
        width,
        height,
      } = this.screen.view
      return {
        width,
        height,
      }
    },
    ...mapGetters('canvas', ['origin']),
    ...mapState('global', {
      screen: state => state.screen,
    }),
    ...mapState('canvas', {
      zoom: state => state.zoom,
    }),
  },
  watch: {
    zoom() {
      this.back()
    },
    origin() {
      this.back()
    },
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
      // 根据标尺尺寸更改原点坐标
      this.offsetX = target.scrollLeft - (this.origin.x - this.size)
      this.offsetY = target.scrollTop - (this.origin.y - this.size)
    },
    scrollEnd() {
      this.$refs.ruler.scrollEnd()
    },
    back() {
      this.$emit('scroll-to', this.origin.x - this.size, this.origin.y - this.size)
    },
  },
}
</script>
