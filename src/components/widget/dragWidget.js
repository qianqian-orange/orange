import Widget from './index'

export default {
  name: 'DragWidget',
  extends: Widget,
  mounted() {
    this.addEventListener()
  },
  beforeDestroy() {
    const el = this.$el
    el.removeEventListener('dragstart', this.dragstart)
    el.removeEventListener('dragend', this.dragend)
  },
  methods: {
    addEventListener() {
      const el = this.$el
      this.dragstart = (evt) => {
        evt.target.style.transform = 'translateZ(0)'
        evt.dataTransfer.setData('dataSource', JSON.stringify({
          id: evt.target.id,
          offsetX: evt.offsetX,
          offsetY: evt.offsetY,
        }))
      }
      el.addEventListener('dragstart', this.dragstart)
      this.dragend = (evt) => {
        evt.target.style.transform = ''
      }
      el.addEventListener('dragend', this.dragend)
    },
  },
}
