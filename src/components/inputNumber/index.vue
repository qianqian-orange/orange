<template>
  <div class="orange-input-number-container">
    <span :class="['orange-input-number-label', size]">
      <slot name="label">
        {{ label }}
      </slot>
    </span>
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
    type: {
      type: String,
      default: 'int',
    },
    label: {
      type: [String, Boolean],
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
      if (this.type === 'int') value = parseInt(value, 10)
      if (this.type === 'float') value = parseFloat(value, 10)
      if (Number.isNaN(value)) return
      this.$emit('input', value)
      this.$emit('change', value)
    },
  },
}
</script>

<style lang="less">
  .orange-input-number {
    &-container {
      position: relative;
    }

    &-label {
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
</style>
