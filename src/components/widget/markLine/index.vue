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
import {
  mapState,
  mapGetters,
} from 'vuex'
import {
  mousemoveQueue,
  mouseupQueue,
  getTarget,
} from '@/lib/document'
import MarkLine, {
  rect,
  MARKLINE,
  MARKLINE_DIRECTION,
  MARKLINE_HANDLER,
} from './index'

const markline = new MarkLine()

export default {
  name: 'MarkLine',
  data() {
    return {
      target: null,
      plainLine: [...MARKLINE[MARKLINE_DIRECTION.xAxis], ...MARKLINE[MARKLINE_DIRECTION.yAxis]]
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
      widgetListMap: state => state.widgetListMap,
    }),
    ...mapGetters('canvas', [
      'widgetList',
    ]),
  },
  mounted() {
    mousemoveQueue.push(({ id, style }) => {
      const { width, height } = this.widgetListMap[id]
      const widgetList = this.widgetList.filter(widget => widget.id !== id)
      this.target = rect({ width, height, style })
      // 将距离标线清空重新收集
      this.distanceLines.length = 0
      let direction = MARKLINE_DIRECTION.yAxis
      this.core({
        ...MARKLINE_HANDLER[direction],
        widgetList,
        lines: MARKLINE[direction],
        direction,
      })
      direction = MARKLINE_DIRECTION.xAxis
      this.core({
        ...MARKLINE_HANDLER[direction],
        widgetList,
        lines: MARKLINE[direction],
        direction,
      })
    })
    mouseupQueue.push(() => {
      Object.keys(this.plainLine).forEach((identification) => {
        this.plainLine[identification].visible = false
      })
      this.distanceLines.length = 0
    })
  },
  methods: {
    core({
      widgetList,
      lines,
      direction,
      targetFilter,
      neighborFilter,
      setPlainLine,
      setDistanceLine,
    }) {
      markline.neighbors = widgetList.map(widget => neighborFilter(rect(widget)))
      lines.forEach((identification) => {
        const line = this.plainLine[identification]
        markline.target = targetFilter(this.target)
        markline.identification = identification
        // 先判断吸附逻辑在判断标线逻辑
        line.isAdsorb = markline.adsorb(line.isAdsorb, (interval) => {
          const el = getTarget()
          switch (direction) {
            case MARKLINE_DIRECTION.yAxis:
              this.target.left += interval
              el.style.left = this.target.left + 'px'
              el.position.startX += interval
              break
            case MARKLINE_DIRECTION.xAxis:
              this.target.top += interval
              el.style.top = this.target.top + 'px'
              el.position.startY += interval
              break
          }
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
        setDistanceLine(this.distanceLines, data)
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
      z-index: 10000;
    }

    &.plain {
      background-color: @markLineBlue;
    }

    &.distance {
      background-color: @markLinePurple;

      &::before {
        content: attr(data-distance);
        position: absolute;
        color: @markLinePurple;
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
