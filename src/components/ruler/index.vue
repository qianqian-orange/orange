<template>
  <div
    v-if="store.visible"
    class="ruler-container"
  >
    <bar
      :offset="offsetX"
      :zoom="zoom"
      :rect="rect"
      :style="{ left: size, height: size }"
    />
    <bar
      :offset="offsetY"
      :zoom="zoom"
      :rect="rect"
      :direction="direction.yAxis"
      :style="{ top: size, width: size }"
    />
    <a-tooltip placement="right">
      <template #title>
        <span>点我回原点</span>
      </template>
      <span
        class="back-btn"
        :style="{ width: size, height: size }"
        @click="back"
        @mouseenter="mouseenter"
        @mouseleave="mouseleave"
      />
    </a-tooltip>
  </div>
</template>

<script>
import createStore from './store'
import { COORDINATE_DIRECTION_MAP } from '@/const/canvas'
import {
  SCROLL_END,
  CONTEXTMENU,
  MOVE_RULER_LINE_VISIBLE,
} from './const/event'
import Bar from './bar'

export default {
  name: 'Ruler',
  components: {
    Bar,
  },
  provide() {
    return {
      store: this.store,
    }
  },
  props: {
    offsetX: {
      type: Number,
      default: 0,
    },
    offsetY: {
      type: Number,
      default: 0,
    },
    zoom: {
      type: Number,
      default: 1,
    },
    rect: {
      type: Object,
      default: () => ({
        width: 0,
        height: 0,
      }),
    },
    size: {
      type: String,
      default: '16px', // 刻度值的宽高尺寸，对于x轴而言是定义高的长度，对于y轴而言是定义宽的长度
    },
  },
  data() {
    return {
      store: createStore(),
      direction: {
        yAxis: COORDINATE_DIRECTION_MAP.yAxis,
      },
    }
  },
  mounted() {
    this.store.on(CONTEXTMENU, this.contextmenu)
  },
  beforeDestroyed() {
    this.store.on(CONTEXTMENU, this.contextmenu)
  },
  methods: {
    back() {
      this.$emit('back')
    },
    scrollEnd() {
      this.store.emit(SCROLL_END)
    },
    contextmenu(data) {
      this.$emit('contextmenu', data)
    },
    mouseenter() {
      this.store.emit(MOVE_RULER_LINE_VISIBLE, false)
    },
    mouseleave() {
      this.store.emit(MOVE_RULER_LINE_VISIBLE, true)
    },
  },
}
</script>

<style lang="less" scoped>
  .ruler-container {
    .back-btn {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      border-right: 1px solid rgb(89, 90, 92);
      border-bottom: 1px solid rgb(89, 90, 92);
      background-color: rgba(235, 86, 72, .6);
      cursor: pointer;
    }
  }
</style>
