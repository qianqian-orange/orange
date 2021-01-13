import { mapMutations } from 'vuex'
import Widget from './index'
import {
  setTarget,
  mouseupQueue,
} from '@/lib/document'
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
    mouseup(target) {
      if (target.id !== this.dataSource.id) return
      const {
        id,
        style: { top, left },
        position: { startX, startY },
      } = target
      this[UPDATE_CANVAS_WIDGET_DATA]({
        id,
        style: { top, left },
      })
      this[ADD_SNAPSHOT]({
        undo: () => {
          this[UPDATE_CANVAS_WIDGET_DATA]({
            id,
            style: { top: startY + 'px', left: startX + 'px' },
          })
        },
        redo: () => {
          this[UPDATE_CANVAS_WIDGET_DATA]({
            id,
            style: { top, left },
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
