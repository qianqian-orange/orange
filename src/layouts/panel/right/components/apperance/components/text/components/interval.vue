<template>
  <div class="text-interval-container">
    <a-tooltip
      v-for="item in items"
      :key="item.icon"
      placement="bottom"
    >
      <template #title>
        <span>{{ item.tip }}</span>
      </template>
      <orange-input-number
        v-bind="item.props"
        size="small"
        @change="item.update"
      >
        <template #label>
          <orange-icon
            :type="item.icon"
          />
        </template>
      </orange-input-number>
    </a-tooltip>
  </div>
</template>

<script>
export default {
  name: 'TextInterval',
  inject: ['store'],
  computed: {
    items() {
      const { letterSpacing, lineHeight, margin } = this.store
      const items = []
      items.push({
        icon: 'icon-zijianju',
        tip: '字间距',
        props: {
          label: true,
          type: 'float',
          value: letterSpacing,
          min: 0,
          max: 100,
          step: 0.1,
          precision: 1,
        },
        update: (value) => {
          this.store.letterSpacing = value
        },
      }, {
        icon: 'icon-hangjianju',
        tip: '行距',
        props: {
          label: true,
          type: 'int',
          value: lineHeight,
          min: 0,
          max: 100,
          step: 1,
          precision: 0,
        },
        update: (value) => {
          this.store.lineHeight = value
        },
      }, {
        icon: 'icon-duanla',
        tip: '段落',
        props: {
          label: true,
          type: 'int',
          value: margin,
          min: 0,
          max: 100,
          step: 1,
          precision: 0,
        },
        update: (value) => {
          this.store.margin = value
        },
      })
      return items
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
