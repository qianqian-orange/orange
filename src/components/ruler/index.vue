<template>
  <div class="ruler-container">
    <bar
      :start="startX"
      :rect="rect"
      :style="{ left: backBtnWidth, height: backBtnWidth }"
    />
    <bar
      :start="startY"
      :rect="rect"
      :direction="COORDINATE_DIRECTION_MAP.yAxis"
      :style="{ top: backBtnWidth, width: backBtnWidth }"
    />
    <a-tooltip placement="right">
      <template #title>
        <span>点我回原点</span>
      </template>
      <span
        class="back-btn"
        :data-identification="RULER_IDENTIFICATION_MAP.backBtn"
        :style="{ width: backBtnWidth, height: backBtnWidth }"
        @click="back"
      />
    </a-tooltip>
  </div>
</template>

<script>
import { COORDINATE_DIRECTION_MAP } from '@/const/canvas'
import { RULER_IDENTIFICATION_MAP } from './ruler'
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
    container: {
      type: Object,
      default: () => ({
        width: 0,
        height: 0,
      }),
    },
  },
  data() {
    return {
      COORDINATE_DIRECTION_MAP,
      RULER_IDENTIFICATION_MAP,
      backBtnWidth: '18px',
    }
  },
  computed: {
    rect() {
      return {
        width: parseInt(this.backBtnWidth, 10) + parseInt(this.container.width, 10) + 'px',
        height: parseInt(this.backBtnWidth, 10) + parseInt(this.container.height, 10) + 'px',
      }
    },
  },
  methods: {
    back() {
      this.$emit('back')
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
