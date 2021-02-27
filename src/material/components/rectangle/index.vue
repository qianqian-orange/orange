<template>
  <div
    :style="rectangleStyle"
    @click.self="onClick"
  >
    <slot />
  </div>
</template>

<script>
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
  computed: {
    rectangleStyle() {
      const styles = []
      if (this.fill.open) styles.push(this.fill.style)
      if (this.stroke.open) styles.push(this.stroke.style)
      if (this.shadow.open) styles.push(this.shadow.style)
      return styles.reduce((res, cur) => Object.assign(res, cur), {})
    },
  },
  methods: {
    onClick(evt) {
      this.$emit('click', evt)
    },
  },
}
</script>
