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
      :value="store.borderRadius"
      :min="0"
      :max="1000"
      size="small"
      @change="onChange"
    />
  </div>
</template>

<script>
export default {
  name: 'BorderRadius',
  inject: ['store'],
  data() {
    return {
      items: ['icon-yuanjiao1'],
    }
  },
  methods: {
    onChange(value) {
      this.store.borderRadius = value
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
