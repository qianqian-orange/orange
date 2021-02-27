<template>
  <div class="text-interval-container">
    <orange-input-number
      v-for="item in items"
      :key="item.icon"
      v-bind="item.props"
      size="small"
      @change="onChange(item.update, ...arguments)"
    >
      <template #label>
        <orange-icon
          :type="item.icon"
        />
      </template>
    </orange-input-number>
  </div>
</template>

<script>
import store from '@/material/store'
import { UPDATE_WIDGET } from '@/material/store/mutation-types'

export default {
  name: 'TextInterval',
  inject: ['store'],
  computed: {
    items() {
      const { component } = this.store.dataSource
      const { style: { letterSpacing }, props: { lineHeight, margin } } = component
      const items = []
      items.push({
        icon: 'icon-zijianju',
        props: {
          label: true,
          type: 'float',
          value: parseFloat(letterSpacing, 10),
          min: 0,
          max: 100,
          step: 0.1,
          precision: 1,
        },
        update: (value) => {
          component.style.letterSpacing = `${value}px`
        },
      }, {
        icon: 'icon-hangjianju',
        props: {
          label: true,
          type: 'int',
          value: parseInt(lineHeight, 10),
          min: 0,
          max: 100,
          step: 1,
          precision: 0,
        },
        update: (value) => {
          component.props.lineHeight = `${value}px`
        },
      }, {
        icon: 'icon-duanla',
        props: {
          label: true,
          type: 'int',
          value: parseInt(margin, 10),
          min: 0,
          max: 100,
          step: 1,
          precision: 0,
        },
        update: (value) => {
          component.props.margin = `${value}px`
        },
      })
      return items
    },
  },
  methods: {
    onChange(update, value) {
      store.emit(UPDATE_WIDGET, {
        log: {
          source: 'layouts -> panel -> right -> components -> apperance -> components -> interval',
          reason: '修改文本间隔',
        },
        update: () => {
          update(value)
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
  .text-interval-container {
    display: flex;
    justify-content: space-between;
    width: 100%;

    ::v-deep.orange-input-number-container {
      width: 32%;

      .ant-input-number {
        width: 100%;
      }
    }

    .anticon {
      margin-top: 4px;
      color: @textPrimaryColor;
      font-size: 14px;
    }
  }
</style>
