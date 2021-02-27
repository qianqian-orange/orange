<template>
  <div class="general-container">
    <p class="general-title">
      通用
    </p>
    <div class="general-block">
      <orange-input-number
        v-for="item in items"
        :key="item.label"
        :style="{ marginBottom: '4px' }"
        v-bind="item.props"
        size="small"
        @change="onChange(item.update, ...arguments)"
      />
    </div>
  </div>
</template>

<script>
import store from '@/material/store'
import { UPDATE_WIDGET } from '@/material/store/mutation-types'

export default {
  name: 'ApperanceGeneral',
  inject: ['store'],
  computed: {
    items() {
      const items = []
      const { container, component, zoom, props: { editable } } = this.store.dataSource
      const computed = value => Math.floor(parseInt(value, 10) / zoom)
      const top = computed(container.style.top)
      const left = computed(container.style.left)
      const width = computed(component.style.width)
      const height = computed(component.style.height)
      const { stretch, move } = editable
      items.push({
        props: {
          label: 'X',
          value: left,
          min: -1000,
          max: 3000,
          disabled: !move,
        },
        update: (value) => {
          const { container } = this.store.dataSource
          container.style.left = value
        },
      }, {
        props: {
          label: 'Y',
          value: top,
          min: -1000,
          max: 3000,
          disabled: !move,
        },
        update: (value) => {
          const { container } = this.store.dataSource
          container.style.top = value
        },
      }, {
        props: {
          label: 'W',
          value: width,
          min: 8,
          max: 3000,
          disabled: !(stretch.w || stretch.e),
        },
        update: (value) => {
          const { component } = this.store.dataSource
          component.style.width = value
        },
      }, {
        props: {
          label: 'H',
          value: height,
          min: 8,
          max: 3000,
          disabled: !(stretch.n || stretch.s),
        },
        update: (value) => {
          const { component } = this.store.dataSource
          component.style.height = value
        },
      })
      return items
    },
  },
  methods: {
    onChange(update, value) {
      store.emit(UPDATE_WIDGET, {
        log: {
          source: 'layouts -> panel -> right -> components -> apperance -> components -> general',
          reason: '修改组件通用样式',
        },
        update: () => {
          const { zoom } = this.store.dataSource
          const computed = value => Math.floor(value * zoom) + 'px'
          update(computed(value))
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
  .general {
    &-container {
      padding: 14px 14px 6px 10px;
      border-bottom: 1px solid @deepBlack;
    }

    &-title {
      padding-left: 4px;
      margin-bottom: 8px;
      color: @greyWhite;
      font-size: 12px;
    }

    &-block {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }
</style>
