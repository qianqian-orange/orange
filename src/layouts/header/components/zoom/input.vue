<template>
  <div class="zoom-input-container">
    <a-input
      v-model="value"
      suffix="%"
      @blur="blur"
    />
  </div>
</template>

<script>
import { NUMBER_REGEX } from '@/const/regex'

export default {
  name: 'ZoomInput',
  data() {
    return {
      value: 100,
      min: 20,
      max: 400,
    }
  },
  watch: {
    value(newVal, oldVal) {
      if (!newVal) this.value = 0
      else if (!NUMBER_REGEX.test(newVal)) this.value = oldVal
      this.value = +this.value
    },
  },
  methods: {
    blur() {
      if (this.value < this.min) this.value = this.min
      else if (this.value > this.max) this.value = this.max
    },
  },
}
</script>

<style lang="less">
  .zoom-input-container {
    height: 44px;
    padding: 8px 16px;
    border-bottom: 1px solid @deepBlack;
    background-color: @lightBlack;

    .ant-input-affix-wrapper {
      background-color: @lightBlack;

      .ant-input {
        height: 27px;
        border-color: @blue;
        color: #fff;
        font-size: 12px;
        background-color: @lightBlack;

        &:hover,
        &:focus {
          border-color: @blue !important;
        }
      }

      .ant-input-suffix {
        color: #fff;
        font-size: 12px;
      }
    }
  }
</style>
