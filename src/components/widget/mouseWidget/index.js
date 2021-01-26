import {
  mapActions,
} from 'vuex'
import { on, off } from '@/utils/dom'
import { leftMousedown } from '@/utils/check'
import { setTarget } from '@/lib/document'
import Bus, {
  CANVAS_WIDGET_RESIZE,
  CANVAS_WIDGET_BOOTSTRAP,
  DOCUMENT_MOUSE_UP,
} from '@/utils/bus'
import { ADD_CANVAS_WIDGET_UPDATE_SNAPSHOT } from '@/store/modules/canvas/action-types'
import menu from './mixins/menu'
import Widget from '@/components/widget'

export default {
  name: 'MouseWidget',
  extends: Widget,
  mixins: [menu],
  mounted() {
    this.addEventListener()
    Bus.$on(DOCUMENT_MOUSE_UP, this.mouseup)
    Bus.$emit(CANVAS_WIDGET_BOOTSTRAP, this)
  },
  beforeDestroy() {
    this.removeEventListener()
    Bus.$off(DOCUMENT_MOUSE_UP, this.mouseup)
  },
  methods: {
    mousedown(evt) {
      // 只有鼠标左键点击的情况下才触发
      if (!leftMousedown(evt)) return
      const target = evt.target
      target.position = {
        startX: target.offsetLeft,
        startY: target.offsetTop,
        clientX: evt.clientX,
        clientY: evt.clientY,
      }
      setTarget(target)
    },
    mouseup(target, move) {
      if (target.id !== this.dataSource.id) return
      // 更新widget信息和添加快照
      const {
        id,
        style: { top, left },
        position: { startX, startY },
      } = target
      // 如果没有移动过那么不添加快照
      if (!move) return
      this[ADD_CANVAS_WIDGET_UPDATE_SNAPSHOT]({
        id,
        update: ({ style: { container } }) => {
          container.top = top
          container.left = left
        },
        snapshot: {
          undo: ({ style: { container } }) => {
            container.top = startY + 'px'
            container.left = startX + 'px'
          },
        },
      })
    },
    click(evt) {
      Bus.$emit(CANVAS_WIDGET_RESIZE, evt.target)
    },
    addEventListener() {
      const el = this.$el
      on(el, 'mousedown', this.mousedown)
      on(el, 'click', this.click)
    },
    removeEventListener() {
      const el = this.$el
      off(el, 'mousedown', this.mousedown)
      off(el, 'click', this.click)
    },
    ...mapActions('canvas', [
      ADD_CANVAS_WIDGET_UPDATE_SNAPSHOT,
    ]),
  },
}
