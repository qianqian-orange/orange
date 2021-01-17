import { mapMutations } from 'vuex'
import Widget from './index'
import {
  setTarget,
  mouseupQueue,
} from '@/lib/document'
import Bus, { CANVAS_WIDGET_RESIZE } from '@/utils/bus'
import { UPDATE_CANVAS_WIDGET_DATA } from '@/store/modules/canvas/mutation-types'
import { ADD_SNAPSHOT } from '@/store/modules/snapshot/mutation-types'

export default {
  name: 'MouseWidget',
  extends: Widget,
  mounted() {
    this.addEventListener()
    mouseupQueue.push(this.mouseup)
    this.$emit('bootstrap', this)
  },
  beforeDestroy() {
    this.removeEventListener()
  },
  methods: {
    mouseup(target, move) {
      if (target.id !== this.dataSource.id) return
      // 显示resizer
      Bus.$emit(CANVAS_WIDGET_RESIZE)
      // 更新widget信息和添加快照
      const {
        id,
        style: { top, left },
        position: { startX, startY },
      } = target
      // 如果没有移动过那么不添加快照
      if (!move) return
      this[UPDATE_CANVAS_WIDGET_DATA]({
        id,
        update: ({ style: { container } }) => {
          container.top = top
          container.left = left
        },
      })
      this[ADD_SNAPSHOT]({
        undo: () => {
          this[UPDATE_CANVAS_WIDGET_DATA]({
            id,
            update: ({ style: { container } }) => {
              container.top = startY + 'px'
              container.left = startX + 'px'
            },
          })
        },
        redo: () => {
          this[UPDATE_CANVAS_WIDGET_DATA]({
            id,
            update: ({ style: { container } }) => {
              container.top = top
              container.left = left
            },
          })
        },
        free: () => {
          target = null
        },
      })
    },
    addEventListener() {
      const el = this.$el
      this.mousedown = (evt) => {
        const target = evt.target
        target.position = {
          startX: target.offsetLeft,
          startY: target.offsetTop,
          clientX: evt.clientX,
          clientY: evt.clientY,
        }
        setTarget(target)
        Bus.$emit(CANVAS_WIDGET_RESIZE)
      }
      el.addEventListener('mousedown', this.mousedown)
    },
    removeEventListener() {
      const el = this.$el
      el.removeEventListener('mousedown', this.mousedown)
    },
    ...mapMutations('canvas', [UPDATE_CANVAS_WIDGET_DATA]),
    ...mapMutations('snapshot', [ADD_SNAPSHOT]),
  },
}
