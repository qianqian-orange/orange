<template>
  <div
    :id="dataSource.id"
    :class="classList"
    :style="dataSource.container.style"
    v-bind="dataSource.container.props"
    v-on="dataSource.container.events"
  >
    <component
      :is="dataSource.is"
      ref="component"
      :style="dataSource.component.style"
      v-bind="dataSource.component.props"
      v-on="dataSource.component.events"
    >
      <template #default>
        <slot />
      </template>
    </component>
  </div>
</template>

<script>
import { splice } from '@/utils/array'
import { GLASS } from './const/classes'

export default {
  name: 'Widget',
  props: {
    dataSource: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      classList: [GLASS],
    }
  },
  methods: {
    addClass(cls) {
      if (this.classList.includes(cls)) return
      this.classList.push(cls)
    },
    removeClass(cls) {
      if (!this.classList.includes(cls)) return
      splice(this.classList, cls)
    },
  },
}
</script>

<style lang="less" scoped>
  .border-dashed-line {
    &::before {
      content: "";
      position: absolute;
      top: -1px;
      right: -1px;
      bottom: -1px;
      left: -1px;
      z-index: -1;
      border: 1px dashed @blue;
    }
  }

  .overflow-hidden {
    overflow: hidden;
  }
</style>
