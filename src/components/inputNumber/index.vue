<template>
  <div class="orange-input-number-container">
    <span
      :class="['label', size]"
    >{{ label }}</span>
    <a-input-number
      :class="[label && 'input-padding-left', hover && 'hover2show']"
      :value="value"
      v-bind="$props"
      v-on="listeners"
      @change="onChange"
    />
  </div>
</template>

<script>
import * as R from 'ramda'
import { InputNumber } from 'ant-design-vue'

export default {
  name: 'OrangeInputNumber',
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    ...InputNumber.props,
    label: {
      type: String,
      default: '',
    },
    hover: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    listeners() {
      return R.omit(['change'], this.$listeners)
    },
  },
  methods: {
    onChange(value) {
      value = parseInt(value, 10)
      if (Number.isNaN(value)) return
      this.$emit('input', value)
      this.$emit('change', value)
    },
  },
}
</script>

<style lang="less">
  .orange-input-number-container {
    position: relative;

    .label {
      position: absolute;
      top: 50%;
      left: 6px;
      transform: translateY(-50%);
      z-index: 1;
      color: @textSecondaryColor;
      font-size: 14px;

      &.large {
        font-size: 16px;
      }

      &.small {
        font-size: 12px;
      }
    }
  }

  .orange-input-number-container .ant-input-number {
    border-color: @deepGrey;
    color: @greyWhite;
    background-color: @black;
    transition: border 0.2s ease-out 0s;
    box-shadow: none;

    &.hover2show {
      border-color: transparent;
    }

    &:hover {
      border-color: @deepGrey;
    }

    &.ant-input-number-focused {
      border-color: @deepBlue;
      outline: 1px solid @deepBlue;
      outline-offset: -2px;
    }

    &.input-padding-left {
      .ant-input-number-input {
        padding-left: 24px;
      }
    }

    &.ant-input-number-sm {
      .ant-input-number-input-wrap {
        font-size: 12px;
        line-height: 22px;
      }
    }

    .ant-input-number-handler {
      transition: none;

      &:active {
        background-color: transparent;
      }
    }

    .ant-input-number-handler-wrap {
      border-left: none;
      background-color: transparent;

      &:hover .ant-input-number-handler {
        height: 50%;
      }
    }

    .ant-input-number-handler-down {
      border-top: 0;
    }

    .ant-input-number-handler-down:hover,
    .ant-input-number-handler-up:hover {
      height: 50% !important;
    }

    .ant-input-number-handler-down-inner,
    .ant-input-number-handler-up-inner {
      color: @textPrimaryColor;
    }
  }
</style>
