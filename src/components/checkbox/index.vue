<template>
  <a-checkbox
    class="orange-checkbox"
    v-bind="$props"
    v-on="$listeners"
  >
    <slot />
  </a-checkbox>
</template>

<script>
import { Checkbox } from 'ant-design-vue'

export default {
  name: 'OrangeCheckbox',
  props: {
    ...Checkbox.props,
  },
}
</script>

<style lang="less">
  .orange-checkbox {
    .ant-checkbox-inner {
      border-color: @deepGrey !important;
      background-color: @deepBlack;
    }

    .ant-checkbox-checked {
      &::after {
        border: none;
      }

      .ant-checkbox-inner {
        background-color: @deepBlue;
      }
    }

    .ant-checkbox:hover {
      .ant-checkbox-inner {
        border-color: @deepGrey !important;
      }
    }
  }
</style>
