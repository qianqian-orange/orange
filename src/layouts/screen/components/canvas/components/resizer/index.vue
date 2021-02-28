<template>
  <resizer
    ref="resizer"
    @mouseup="mouseup"
  />
</template>

<script>
import Bus, {
  CANVAS_WIDGET_RESIZE,
  DOCUMENT_MOUSE_MOVE,
  CANVAS_WIDGET_RESIZER_VISIBLE,
} from '@/utils/bus'
import Resizer from '@/components/resizer'

const fns = []

export default {
  name: 'CanvasResizer',
  components: {
    Resizer,
  },
  computed: {
    resizer() {
      return this.$refs.resizer
    },
  },
  mounted() {
    fns.push(Bus.$on(CANVAS_WIDGET_RESIZER_VISIBLE, (visible) => {
      this.resizer.visible = visible
    }))
    // 拖拽组件时隐藏resizer
    fns.push(Bus.$on(DOCUMENT_MOUSE_MOVE, () => {
      this.resizer.visible = false
    }))
    fns.push(Bus.$on(CANVAS_WIDGET_RESIZE, (el) => {
      const widget = el[el.id]
      this.$emit('adjust', {
        widget,
        el: this.resizer.$el,
      })
      const {
        style: {
          minWidth,
          minHeight,
        },
      } = el.firstChild
      const { editable: { stretch } } = widget.props
      this.$refs.resizer.setData({
        el,
        direction: stretch,
        minWidth: parseInt(minWidth, 10),
        minHeight: parseInt(minHeight, 10),
        update: {
          width: (val) => { el.firstChild.style.width = val },
          height: (val) => { el.firstChild.style.height = val },
          top: (val) => { el.style.top = val },
          left: (val) => { el.style.left = val },
        },
      })
    }))
  },
  beforeDestroy() {
    fns.forEach(fn => fn())
    fns.length = 0
  },
  methods: {
    mouseup(el, prev, current) {
      const widget = el[el.id]
      const value = widget.zoom
      const update = ({
        widget: { zoom, container, component },
        rect: { top, left, width, height },
      }) => {
        const computed = (value, percent) => Math.floor(parseInt(value, 10) * percent) + 'px'
        const percent = zoom / value
        container.style.top = computed(top, percent)
        container.style.left = computed(left, percent)
        component.style.width = computed(width, percent)
        component.style.height = computed(height, percent)
      }
      widget.container.emit('snapshot', {
        log: {
          source: 'layouts -> screen -> components -> resizer',
          reason: '调节组件大小后修改样式并且添加快照',
        },
        update: ({ widget: { container, component } }) => {
          container.style.top = current.top
          container.style.left = current.left
          component.style.width = current.width
          component.style.height = current.height
        },
        snapshot: {
          undo: ({ widget }) => {
            update({
              widget,
              rect: prev,
            })
          },
          redo: ({ widget }) => {
            update({
              widget,
              rect: current,
            })
          },
          free: () => {
            prev = null
            current = null
          },
        },
      })
    },
  },
}
</script>
