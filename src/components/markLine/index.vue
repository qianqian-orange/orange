<template>
  <div class="mark-line-container">
    <div
      v-for="identification in Object.keys(plainLine)"
      v-show="plainLine[identification].visible"
      :key="identification"
      class="mark-line plain"
      :style="plainLine[identification].style"
    />
    <div
      v-for="(distance, index) in distanceLines"
      :key="index"
      :class="['mark-line', 'distance', distance.direction]"
      :style="distance.style"
      :data-distance="distance.interval"
    />
  </div>
</template>

<script>
import { on, off } from '@/utils/dom'
import { keys } from '@/utils/object'
import { COORDINATE_DIRECTION_MAP } from '@/const/canvas'
import MarkLine, {
  MARKLINE_LINE_MAP,
  MARKLINE_HANDLER_MAP,
} from './markLine'

const markline = new MarkLine()
const cache = {
  [COORDINATE_DIRECTION_MAP.yAxis]: {
    neighbors: null,
  },
  [COORDINATE_DIRECTION_MAP.xAxis]: {
    neighbors: null,
  },
}

export default {
  name: 'MarkLine',
  props: {
    target: {
      type: Object,
      required: true,
    },
    zoom: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      markline: false,
      plainLine: MARKLINE_LINE_MAP[COORDINATE_DIRECTION_MAP.xAxis].concat(MARKLINE_LINE_MAP[COORDINATE_DIRECTION_MAP.yAxis])
        .reduce((res, identification) => {
          res[identification] = {
            visible: false,
            adsorb: false,
            style: {
              top: 0,
              left: 0,
              width: '1px',
              height: '1px',
            },
          }
          return res
        }, {}),
      distanceLines: [],
    }
  },
  mounted() {
    on(document, 'mousemove', this.mousemove)
    on(document, 'mouseup', this.mouseup)
  },
  beforeDestroy() {
    off(document, 'mousemove', this.mousemove)
    off(document, 'mouseup', this.mouseup)
  },
  methods: {
    setData({ neighbors }) {
      this.markline = true
      ;[COORDINATE_DIRECTION_MAP.xAxis, COORDINATE_DIRECTION_MAP.yAxis].forEach((direction) => {
        cache[direction].neighbors = neighbors.map(item => MARKLINE_HANDLER_MAP[direction].neighborFilter(item))
      })
    },
    mousemove() {
      if (!this.markline) return
      // 将距离标线清空重新收集
      this.distanceLines.length = 0
      ;[COORDINATE_DIRECTION_MAP.xAxis, COORDINATE_DIRECTION_MAP.yAxis].forEach((direction) => {
        const {
          targetFilter,
          setPlainLine,
          setDistanceLine,
        } = MARKLINE_HANDLER_MAP[direction]
        markline.target = targetFilter(this.target)
        markline.neighbors = cache[direction].neighbors
        MARKLINE_LINE_MAP[direction].forEach((identification) => {
          const line = this.plainLine[identification]
          markline.identification = identification
          // 先判断吸附逻辑在判断标线逻辑
          line.adsorb = markline.adsorb(line.adsorb, (interval) => {
            this.$emit('adsorb', direction, interval)
            // 这里注意需要更新target值
            markline.target = targetFilter(this.target)
          })
          const data = markline.line()
          if (!data) {
            line.visible = false
            return
          }
          line.visible = true
          setPlainLine(line, data)
          setDistanceLine(this.distanceLines, data, this.zoom)
        })
      })
    },
    mouseup() {
      if (!this.markline) return
      this.markline = false
      // 将普通标线隐藏
      keys(this.plainLine, (obj) => { obj.visible = false })
      // 将距离标线清空
      this.distanceLines.length = 0
      // 重置缓存数据
      keys(cache, (obj) => { obj.neighbors = null })
    },
  },
}
</script>

<style lang="less" scoped>
  .mark-line {
    position: absolute;

    &-container {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
    }

    &.plain {
      background-color: @lightBlue;
    }

    &.distance {
      background-color: @purple;

      &::before {
        content: attr(data-distance);
        position: absolute;
        color: @purple;
        font-size: 12px;
      }
    }

    &.yAxis {
      &::before {
        top: 50%;
        left: 4px;
        transform: translateY(-50%);
      }
    }

    &.xAxis {
      &::before {
        top: 4px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
</style>
