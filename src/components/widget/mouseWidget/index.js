import {
  mapState,
  mapMutations,
  mapActions,
} from 'vuex'
import { on, off } from '@/utils/dom'
import { leftMousedown } from '@/utils/check'
import { setTarget } from '@/lib/document'
import Bus, {
  CANVAS_WIDGET_BOOTSTRAP,
  DOCUMENT_MOUSE_UP,
  CANVAS_WIDGET_MOUSEDOWN,
} from '@/utils/bus'
import { ADD_CANVAS_WIDGET_UPDATE_SNAPSHOT } from '@/store/modules/canvas/action-types'
import { UPDATE_CANVAS_WIDGET_DATA } from '@/store/modules/canvas/mutation-types'
import menu from './mixins/menu'
import Widget from '@/components/widget'

export default {
  name: 'MouseWidget',
  extends: Widget,
  mixins: [menu],
  computed: {
    ...mapState('canvas', {
      zoom: state => state.zoom,
    }),
  },
  mounted() {
    const vm = this
    this[UPDATE_CANVAS_WIDGET_DATA]({
      log: {
        source: 'mouseWidget -> mounted',
        reason: '绑定当前vm实例的方法',
      },
      id: this.dataSource.id,
      update: ({ widget }) => {
        widget.getInstance = () => vm
      },
    })
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
      if (evt.target !== this.$el) return
      const target = evt.target
      target.position = {
        startX: target.offsetLeft,
        startY: target.offsetTop,
        clientX: evt.clientX,
        clientY: evt.clientY,
      }
      setTarget(target)
      Bus.$emit(CANVAS_WIDGET_MOUSEDOWN)
    },
    mouseup(target, move) {
      if (target !== this.$el) return
      // 更新widget信息和添加快照
      const {
        id,
        style: { top, left },
        position: { startX, startY },
      } = target
      // 如果没有移动过那么不添加快照
      if (!move) return
      // 保留添加快照时缩放因子的值
      const zoom = this.zoom
      this[ADD_CANVAS_WIDGET_UPDATE_SNAPSHOT]({
        id,
        update: ({ widget: { style: { container } } }) => {
          container.top = top
          container.left = left
        },
        snapshot: {
          undo: ({ state, widget: { style: { container } } }) => {
            const percent = state.zoom / zoom
            container.top = Math.floor(startY * percent) + 'px'
            container.left = Math.floor(startX * percent) + 'px'
          },
          redo: ({ state, widget: { style: { container } } }) => {
            const percent = state.zoom / zoom
            container.top = Math.floor(parseInt(top, 10) * percent) + 'px'
            container.left = Math.floor(parseInt(left, 10) * percent) + 'px'
          },
        },
      })
    },
    addEventListener() {
      const el = this.$el
      on(el, 'mousedown', this.mousedown)
    },
    removeEventListener() {
      const el = this.$el
      off(el, 'mousedown', this.mousedown)
    },
    ...mapMutations('canvas', [
      UPDATE_CANVAS_WIDGET_DATA,
    ]),
    ...mapActions('canvas', [
      ADD_CANVAS_WIDGET_UPDATE_SNAPSHOT,
    ]),
  },
}
