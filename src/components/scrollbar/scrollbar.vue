<template>
  <div
    :class="['el-scrollbar', fitHeight && 'fitHeight']"
  >
    <div
      v-if="native"
      ref="wrap"
      :class="[wrapClass, 'el-scrollbar__wrap']"
      :style="wrapStylePlus"
    >
      <component
        :is="tag"
        ref="resize"
        :class="['el-scrollbar__view', viewClass]"
        :style="viewStyle"
      >
        <slot />
      </component>
    </div>
    <template v-else>
      <div
        ref="wrap"
        :style="wrapStylePlus"
        :class="[wrapClass, 'el-scrollbar__wrap', gutter ? '' : 'el-scrollbar__wrap--hidden-default']"
        @scroll="handleScroll"
      >
        <component
          :is="tag"
          ref="resize"
          :class="['el-scrollbar__view', viewClass]"
          :style="viewStyle"
        >
          <slot />
        </component>
      </div>
      <bar
        :move="moveX"
        :size="sizeWidth"
      />
      <bar
        vertical
        :move="moveY"
        :size="sizeHeight"
      />
    </template>
  </div>
</template>

<script>
import { addResizeListener, removeResizeListener } from '@/utils/resize-event'
import scrollbarWidth from '@/utils/scrollbar-width'
import { toObject } from '@/utils'
import Bar from './bar'

export default {
  name: 'ElScrollbar',
  components: {
    Bar,
  },
  props: {
    native: {
      type: Boolean,
      default: false,
    },
    wrapStyle: {
      type: [String, Object],
      default: () => ({}),
    },
    wrapClass: {
      type: String,
      default: '',
    },
    viewClass: {
      type: String,
      default: '',
    },
    viewStyle: {
      type: [String, Object],
      default: () => ({}),
    },
    fitHeight: {
      type: Boolean,
      default: true,
    },
    noresize: {
      type: Boolean,
      default: false,
    }, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
    tag: {
      type: String,
      default: 'div',
    },
  },
  data() {
    return {
      sizeWidth: '0',
      sizeHeight: '0',
      moveX: 0,
      moveY: 0,
      timer: null,
    }
  },
  computed: {
    wrap() {
      return this.$refs.wrap
    },
    gutter() {
      return scrollbarWidth()
    },
    wrapStylePlus() {
      let style = this.wrapStyle
      if (this.gutter) {
        const gutterWith = `-${this.gutter}px`
        const gutterStyle = `margin-bottom: ${gutterWith}; margin-right: ${gutterWith};`

        if (Array.isArray(this.wrapStyle)) {
          style = toObject(this.wrapStyle)
          style.marginRight = style.marginBottom = gutterWith
        } else if (typeof this.wrapStyle === 'string') {
          style += gutterStyle
        } else {
          style = gutterStyle
        }

        if (this.fitHeight) {
          if (typeof style === 'string') style += `height: calc(100% + ${this.gutter}px);`
          else style.height = `calc(100% + ${this.gutter}px)`
        }
      }
      return style
    },
  },
  mounted() {
    if (this.native) return
    this.$nextTick(this.update)
    !this.noresize && addResizeListener(this.$refs.resize, this.update)
  },
  beforeDestroy() {
    if (this.native) return
    !this.noresize && removeResizeListener(this.$refs.resize, this.update)
  },
  methods: {
    handleScroll(evt) {
      const wrap = this.wrap

      this.moveY = ((wrap.scrollTop * 100) / wrap.clientHeight)
      this.moveX = ((wrap.scrollLeft * 100) / wrap.clientWidth)
      this.$emit('scroll', evt)

      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$emit('scroll-end')
      }, 100)
    },
    update() {
      const wrap = this.wrap
      if (!wrap) return

      const heightPercentage = (wrap.clientHeight * 100 / wrap.scrollHeight)
      const widthPercentage = (wrap.clientWidth * 100 / wrap.scrollWidth)

      this.sizeHeight = (heightPercentage < 100) ? (heightPercentage + '%') : ''
      this.sizeWidth = (widthPercentage < 100) ? (widthPercentage + '%') : ''
    },
    scrollTo(x, y) {
      this.wrap.scrollTo(x, y)
    },
  },
}
</script>
