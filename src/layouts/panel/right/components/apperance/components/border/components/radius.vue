<template>
  <div class="border-item-container">
    <ul class="border-radius-list">
      <li
        v-for="item in items"
        :key="item"
        :class="['border-radius-item', 'active']"
      >
        <orange-icon :type="item" />
      </li>
    </ul>
    <orange-input-number
      :value="value"
      :min="0"
      :max="1000"
      size="small"
      @change="onChange"
    />
  </div>
</template>

<script>
import base from '@/layouts/panel/right/components/apperance/mixins/base'

export default {
  name: 'BorderRadius',
  mixins: [base],
  data() {
    return {
      items: ['icon-yuanjiao1'],
    }
  },
  computed: {
    value() {
      return parseInt(this.component.style.borderRadius, 10)
    },
  },
  methods: {
    onChange(value) {
      this.update({
        log: {
          source: 'layouts -> panel -> right -> components -> apperance -> components -> border -> components -> radius',
          reason: '修改方框圆角',
        },
        update: () => {
          this.component.style.borderRadius = `${value}px`
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
  @import url("./index.less");

  .border-item-container {
    ::v-deep.orange-input-number-container {
      width: 60px;

      .ant-input-number {
        width: 100%;
      }
    }
  }

  .border-radius {
    &-list {
      display: flex;
      margin-right: 8px;
      border: 1px solid @deepGrey;
      background-color: @black;
    }

    &-item {
      width: 24px;
      height: 20px;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
      cursor: pointer;

      &:hover {
        color: @deepBlue;
      }

      &.active {
        color: @lightGreyWhite;
        background-color: @deepBlue;
      }
    }
  }
</style>
