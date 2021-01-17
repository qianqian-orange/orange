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
} from '@/lib/document'
import MarkLine, {
  rect,
  MARKLINE,
  MARKLINE_DIRECTION,
  MARKLINE_HANDLER,
} from './markLine'

const markline = new MarkLine()
const cache = {
  [MARKLINE_DIRECTION.yAxis]: {
    neighbors: null,
  },
  [MARKLINE_DIRECTION.xAxis]: {
    neighbors: null,
  },
}

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
      const { width, height } = this.widgetListMap[id].style.component
      const widgetList = this.widgetList.filter(widget => widget.id !== id)
      this.target = rect({ width, height, top: style.top, left: style.left })
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
      // 将普通标线隐藏
      Object.keys(this.plainLine).forEach((identification) => {
        this.plainLine[identification].visible = false
      })
      // 将距离标线清空
      this.distanceLines.length = 0
      // 重置缓存数据
      Object.keys(cache).forEach((key) => {
        cache[key].neighbors = null
      })
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
      update,
    }) {
      markline.neighbors = cache[direction].neighbors ||
        (cache[direction].neighbors = widgetList.map(({ style }) => neighborFilter(rect({
          width: style.component.width,
          height: style.component.height,
          top: style.container.top,
          left: style.container.left,
        }))))
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
