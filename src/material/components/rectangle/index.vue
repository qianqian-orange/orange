<template>
  <div :style="rectangleStyle">
    <slot />
  </div>
</template>

<script>
import { on, off } from '@/utils/dom'

export default {
  name: 'OrangeRectangle',
  props: {
    fill: {
      type: Object,
      required: true,
    },
    stroke: {
      type: Object,
      required: true,
    },
    shadow: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      events: [{
        event: 'click',
        callback: null,
      }, {
        event: 'dblclick',
        callback: null,
      }],
    }
  },
  computed: {
    rectangleStyle() {
      const styles = []
      if (this.fill.open) styles.push(this.fill.style)
      if (this.stroke.open) styles.push(this.stroke.style)
      if (this.shadow.open) {
        const { shadowColor, shadowOffsetX, shadowOffsetY, shadowBlur, shadowSpread } = this.shadow
        styles.push({
          boxShadow: `${shadowColor} ${shadowOffsetX} ${shadowOffsetY} ${shadowBlur} ${shadowSpread}`,
        })
      }
      return styles.reduce((res, cur) => Object.assign(res, cur), {})
    },
  },
  mounted() {
    this.events.forEach((item) => {
      item.callback = () => {
        this.$emit(item.event)
      }
      on(this.$el, item.event, item.callback)
    })
  },
  beforeDestroy() {
    this.events.forEach((item) => {
      off(this.$el, item.event, item.callback)
    })
  },
}
</script>
