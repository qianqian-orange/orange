<template>
  <transition
    name="hover-menu"
    @enter="enter"
    @leave="leave"
  >
    <div
      v-show="visible"
      class="hover-menu-container"
    >
      <orange-menu
        ref="hover-menu"
        :width="width"
        :size="size"
        :menus="menus"
        @click="click"
      />
    </div>
  </transition>
</template>

<script>
import Bus, {
  CANVAS_HOVER_MENU,
  DOCUMENT_MOUSE_DOWN,
} from '@/utils/bus'
import { sleep } from '@/utils/timer'
import {
  MENU_ITEM,
  MENU_DEFAULT_WIDTH,
  MENU_SIZE,
} from '@/const/menu'
import OrangeMenu from '@/components/menu/menu'

let position = {}

export default {
  name: 'HoverMenu',
  components: {
    OrangeMenu,
  },
  data() {
    return {
      width: MENU_DEFAULT_WIDTH,
      menus: [],
      visible: false,
      size: MENU_SIZE.normal,
    }
  },
  mounted() {
    Bus.$on(DOCUMENT_MOUSE_DOWN, this.mousedown)
    Bus.$on(CANVAS_HOVER_MENU, this.setData)
  },
  beforeDestroy() {
    Bus.$off(DOCUMENT_MOUSE_DOWN, this.mousedown)
    Bus.$off(CANVAS_HOVER_MENU, this.setData)
  },
  methods: {
    enter(el) {
      const { top, left, width, height } = this.calcPosition()
      el.style.top = top
      el.style.left = left
      el.style.width = width
      el.style.height = height
    },
    leave(el) {
      el.style.width = 0
      el.style.height = 0
    },
    calcPosition() {
      const {
        clientWidth,
        clientHeight,
      } = document.documentElement
      const {
        offsetWidth,
        offsetHeight,
      } = this.$refs['hover-menu'].$el
      // 与边界保持的距离
      const interval = 20
      // 与鼠标的偏移距离
      const offset = 4
      const top = position.top + offsetHeight + interval > clientHeight
        ? clientHeight - offsetHeight - interval : position.top
      const left = position.left + offsetWidth + interval > clientWidth
        ? position.left - offsetWidth - offset : position.left + offset
      return {
        top: top + 'px',
        left: left + 'px',
        width: offsetWidth + 'px',
        height: offsetHeight + 'px',
      }
    },
    mousedown(evt) {
      // 利用glass类给menu-item添加一个伪元素，方便将evt.tagret指向menu-item
      if (evt.target.dataset.identification === MENU_ITEM) return
      this.visible = false
    },
    setData(data) {
      this.menus = data.menus
      this.width = data.width || MENU_DEFAULT_WIDTH
      this.size = data.size || MENU_SIZE.normal
      position = data.position
      // 这里秒延时的目的：
      // 一是因为需要用到菜单的宽高数据，所以需要等菜单数据渲染出来
      // 二是为了实现连续右键widget组件时能够过渡效果，100秒是有过渡总时长决定的
      sleep(100)
        .then(() => {
          this.visible = true
        })
    },
    click() {
      this.visible = false
    },
  },
}
</script>

<style lang="less" scoped>
  .hover-menu-container {
    position: fixed;
    z-index: 10000;
    overflow: hidden;
    width: 0;
    height: 0;
    box-shadow:
      rgba(0, 0, 0, 0.3) 0 2px 6px 0,
      rgba(0, 0, 0, 0.15) 0 10px 30px 0,
      rgb(37, 38, 38) 0 1px 0 0 inset;

    &.hover-menu-enter-active,
    &.hover-menu-leave-active {
      transition-property: opacity, width, height;
      transition-duration: .1s;
      transition-timing-function: ease-in-out;
      transform-origin: 0 0;
    }

    &.hover-menu-enter,
    &.hover-menu-leave-to {
      opacity: 0;
    }
  }
</style>
