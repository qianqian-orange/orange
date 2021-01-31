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
import { mapState } from 'vuex'
import { getTarget } from '@/lib/document'
import Bus, {
  DOCUMENT_MOUSE_MOVE,
  DOCUMENT_MOUSE_UP,
} from '@/utils/bus'
import { keys } from '@/utils/object'
import { COORDINATE_DIRECTION_MAP } from '@/const/canvas'
import MarkLine, {
  rect,
  MARKLINE_MAP,
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
    zoom: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      target: null,
      plainLine: [...MARKLINE_MAP[COORDINATE_DIRECTION_MAP.xAxis], ...MARKLINE_MAP[COORDINATE_DIRECTION_MAP.yAxis]]
        .reduce((res, identification) => {
          res[identification] = {
            visible: false,
            isAdsorb: false,
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
  computed: {
    ...mapState('canvas', {
      mouseWidgetList: state => state.mouseWidgetList,
    }),
  },
  mounted() {
    Bus.$on(DOCUMENT_MOUSE_MOVE, this.mousemove)
    Bus.$on(DOCUMENT_MOUSE_UP, this.mouseup)
  },
  beforeDestroy() {
    Bus.$off(DOCUMENT_MOUSE_MOVE, this.mousemove)
    Bus.$off(DOCUMENT_MOUSE_UP, this.mouseup)
  },
  methods: {
    mousemove({ id, style }) {
      const { offsetWidth, offsetHeight } = getTarget()
      const widgetList = this.mouseWidgetList.filter(widget => widget.id !== id)
      this.target = rect({
        width: offsetWidth + 'px',
        height: offsetHeight + 'px',
        top: style.top,
        left: style.left,
      }, this.zoom)
      // 将距离标线清空重新收集
      this.distanceLines.length = 0
      let direction = COORDINATE_DIRECTION_MAP.yAxis
      this.core({
        ...MARKLINE_HANDLER_MAP[direction],
        widgetList,
        lines: MARKLINE_MAP[direction],
        direction,
      })
      direction = COORDINATE_DIRECTION_MAP.xAxis
      this.core({
        ...MARKLINE_HANDLER_MAP[direction],
        widgetList,
        lines: MARKLINE_MAP[direction],
        direction,
      })
    },
    mouseup() {
      // 将普通标线隐藏
      keys(this.plainLine, (obj) => { obj.visible = false })
      // 将距离标线清空
      this.distanceLines.length = 0
      // 重置缓存数据
      keys(cache, (obj) => { obj.neighbors = null })
    },
    core({
      widgetList,
      lines,
      direction,
      targetFilter,
      neighborFilter,
      setPlainLine,
      setDistanceLine,
      update,
    }) {
      markline.neighbors = cache[direction].neighbors ||
        (cache[direction].neighbors = widgetList.map(({ style }) => neighborFilter(rect({
          width: style.component.width,
          height: style.component.height,
          top: style.container.top,
          left: style.container.left,
        }, this.zoom))))
      lines.forEach((identification) => {
        const line = this.plainLine[identification]
        markline.target = targetFilter(this.target)
        markline.identification = identification
        // 先判断吸附逻辑在判断标线逻辑
        line.isAdsorb = markline.adsorb(line.isAdsorb, (interval) => {
          update(this.target, interval)
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
    },
  },
}
</script>

<style lang="less" scoped>
  .mark-line {
    position: absolute;

    &-container {
      position: relative;
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
