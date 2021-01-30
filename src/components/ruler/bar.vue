<template>
  <div :class="['ruler-bar-container', direction]">
    <!-- 由于父元素的mouseenter事件优先于子元素执行，尝试过子元素添加.stop修饰符方案不行，所以采用改变布局的方式解决 -->
    <div
      style="width: 100%; height: 100%;"
      @mouseenter="mouseenter"
      @mousemove="mousemove"
      @mouseleave="mouseleave"
      @click="add"
    >
      <canvas
        :id="id"
        :width="width"
        :height="height"
      />
      <reference-line
        v-show="line.visible"
        type="active"
        :data-source="line"
      />
    </div>
    <reference-line-list
      ref="lineList"
      :boundary="boundary"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import uuid from '@/utils/uid'
import { COORDINATE_DIRECTION_MAP } from '@/const/canvas'
import { ADD_REFERENCE_LINE } from '@/store/modules/ruler/mutation-types'
import Ruler, { RULER_BAR_MAP } from './ruler'
import menu from './mixins/menu'
import ReferenceLine from './line'
import ReferenceLineList from './lineList'

export default {
  name: 'RulerBar',
  components: {
    ReferenceLine,
    ReferenceLineList,
  },
  mixins: [menu],
  provide() {
    return {
      direction: this.direction,
    }
  },
  props: {
    direction: {
      type: String,
      default: COORDINATE_DIRECTION_MAP.xAxis,
    },
    start: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      id: `ruler-canvas-${uuid()}`,
      ruler: null,
      width: 0,
      height: 0,
      offsetX: 0,
      offsetY: 0,
      clientX: 0,
      clientY: 0,
      line: {
        visible: false,
        num: 0,
        style: {},
      },
    }
  },
  computed: {
    boundary() {
      return RULER_BAR_MAP[this.direction].boundary(this)
    },
    ...mapState('ruler', {
      view: state => state.view,
    }),
  },
  watch: {
    start(value) {
      // 更新画布
      this.update({ start: value })
      // 更新刻度线
      this.$refs.lineList.offset(value)
    },
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      const {
        offsetWidth,
        offsetHeight,
      } = this.$el
      this.width = offsetWidth
      this.height = offsetHeight
      this.ruler = new Ruler({
        id: this.id,
        direction: this.direction,
      })
      this.$nextTick(() => {
        this.ruler.draw()
      })
    },
    mouseenter(evt) {
      RULER_BAR_MAP[this.direction].mouseenter(this, evt)
    },
    mousemove(evt) {
      RULER_BAR_MAP[this.direction].mousemove(this, evt)
    },
    mouseleave() {
      this.line.visible = false
    },
    update({ start }) {
      this.ruler.update({ start })
    },
    add() {
      this[ADD_REFERENCE_LINE]({
        direction: this.direction,
        line: {
          id: uuid(),
          visible: true,
          num: this.line.num,
          style: {
            ...this.line.style,
          },
        },
      })
    },
    ...mapMutations('ruler', [ADD_REFERENCE_LINE]),
  },
}
</script>

<style lang="less" scoped>
  .ruler-bar-container {
    position: absolute;
    z-index: 100;

    &.xAxis {
      top: 0;
      right: 0;
    }

    &.yAxis {
      bottom: 0;
      left: 0;
    }
  }
</style>
