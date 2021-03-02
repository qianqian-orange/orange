<template>
  <div class="sandbox-container">
    <widget
      v-for="item in items"
      :key="item.id"
      :data-source="item"
    />
  </div>
</template>

<script>
import uuid from '@/utils/uid'
import Widget from './widget'

export default {
  name: 'Sandbox',
  components: {
    Widget,
  },
  props: {
    widgets: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      id: `sandbox-${uuid()}`,
      dataSource: {},
    }
  },
  computed: {
    items() {
      return this.widgets.map(widget => widget.compile(this))
    },
  },
  created() {
    window[this.id] = this
  },
  beforeDestroy() {
    delete window[this.id]
  },
}
</script>

<style lang="less" scoped>
  .sandbox-container {
    position: relative;
    z-index: 0;
    width: 100%;
    height: 100%;
  }
</style>

<style lang="less">
  .sandbox-container {
    .anticon svg {
      width: 100%;
      height: 100%;
    }
  }
</style>
