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
        @change="onChange(item.update, ...arguments)"
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
import base from '@/layouts/panel/right/components/apperance/mixins/base'

export default {
  name: 'TextInterval',
  mixins: [base],
  computed: {
    items() {
      const { style: { letterSpacing }, props: { lineHeight, margin } } = this.component
      const items = []
      items.push({
        icon: 'icon-zijianju',
        tip: '字间距',
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
          this.component.style.letterSpacing = `${value}px`
        },
      }, {
        icon: 'icon-hangjianju',
        tip: '行距',
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
          this.component.props.lineHeight = `${value}px`
        },
      }, {
        icon: 'icon-duanla',
        tip: '段落',
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
          this.component.props.margin = `${value}px`
        },
      })
      return items
    },
  },
  methods: {
    onChange(update, value) {
      this.update({
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
