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
        :label="item.label"
        :value="item.value"
        :min="item.min"
        :max="item.max"
        size="small"
        @change="onChange(item, ...arguments)"
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
  data() {
    return {
      items: [],
    }
  },
  computed: {
    rect() {
      const {
        zoom,
        container: {
          style: {
            top,
            left,
          },
        },
        component: {
          style: {
            width,
            height,
          },
        },
      } = this.store.dataSource
      const computed = value => Math.floor(parseInt(value, 10) / zoom)
      return {
        top: computed(top),
        left: computed(left),
        width: computed(width),
        height: computed(height),
      }
    },
  },
  watch: {
    rect() {
      this.setData()
    },
  },
  mounted() {
    this.setData()
  },
  methods: {
    setData() {
      const { top, left, width, height } = this.rect
      this.items = [{
        label: 'X',
        value: left,
        min: -1000,
        max: 3000,
      }, {
        label: 'Y',
        value: top,
        min: -1000,
        max: 3000,
      }, {
        label: 'W',
        value: width,
        min: 8,
        max: 3000,
      }, {
        label: 'H',
        value: height,
        min: 8,
        max: 3000,
      }]
    },
    onChange(item, value) {
      store.emit(UPDATE_WIDGET, {
        log: {
          source: 'layouts -> panel -> right -> components -> apperance -> components -> general',
          reason: '修改组件通用样式',
        },
        update: () => {
          const { container, component, zoom } = this.store.dataSource
          const computed = value => Math.floor(value * zoom) + 'px'
          switch (item.label) {
            case 'X':
              container.style.left = computed(value)
              break
            case 'Y':
              container.style.top = computed(value)
              break
            case 'W':
              component.style.width = computed(value)
              break
            case 'H':
              component.style.height = computed(value)
              break
          }
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
  .general {
    &-container {
      padding: 10px 14px 6px 10px;
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
