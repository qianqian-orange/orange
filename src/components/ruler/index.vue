<template>
  <div class="ruler-container">
    <bar
      :start="startX"
      :zoom="zoom"
      :style="{ left: `${size}px`, height: `${size}px` }"
    />
    <bar
      :start="startY"
      :zoom="zoom"
      :direction="direction.yAxis"
      :style="{ top: `${size}px`, width: `${size}px` }"
    />
    <a-tooltip placement="right">
      <template #title>
        <span>点我回原点</span>
      </template>
      <span
        class="back-btn"
        :data-identification="identification.backBtn"
        :style="{ width: `${size}px`, height: `${size}px` }"
        @click="back"
      />
    </a-tooltip>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { UPDATE_RULER_DATA } from '@/store/modules/ruler/mutation-types'
import { COORDINATE_DIRECTION_MAP } from '@/const/canvas'
import { RULER_IDENTIFICATION_MAP } from './ruler'
import eventEmitter, { SCROLL_END } from './eventEmitter'
import Bar from './bar'

export default {
  name: 'Ruler',
  components: {
    Bar,
  },
  props: {
    startX: {
      type: Number,
      default: 0,
    },
    startY: {
      type: Number,
      default: 0,
    },
    zoom: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      direction: {
        yAxis: COORDINATE_DIRECTION_MAP.yAxis,
      },
      identification: {
        backBtn: RULER_IDENTIFICATION_MAP.backBtn,
      },
    }
  },
  computed: {
    ...mapState('ruler', {
      size: state => state.size,
    }),
  },
  watch: {
    zoom(value) {
      this[UPDATE_RULER_DATA]({
        log: {
          source: 'ruler -> index.vue',
          reason: '当缩放因子改变时修改参考线的定位位置',
        },
        update: ({ referenceLine }) => {
          referenceLine[COORDINATE_DIRECTION_MAP.xAxis].forEach((line) => {
            line.style.left = Math.floor(line.num * value) - this.startX + 'px'
          })
          referenceLine[COORDINATE_DIRECTION_MAP.yAxis].forEach((line) => {
            line.style.top = Math.floor(line.num * value) - this.startY + 'px'
          })
        },
      })
    },
  },
  destroyed() {
    eventEmitter.destroy()
  },
  methods: {
    back() {
      this.$emit('back')
    },
    scrollEnd() {
      eventEmitter.emit(SCROLL_END)
    },
    ...mapMutations('ruler', [UPDATE_RULER_DATA]),
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
