<template>
  <div
    class="orange-input-select-container"
    :style="{ width }"
  >
    <a-select
      class="orange-select"
      :value="value"
      :size="size"
      dropdown-class-name="orange-select-dropdown"
      @select="update"
    >
      <template #default>
        <slot />
      </template>
    </a-select>
    <orange-input-number
      :value="value"
      size="small"
      :hover="false"
      :min="min"
      :max="max"
      @change="update"
    />
  </div>
</template>

<script>
export default {
  name: 'OrangeInputSelect',
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
    size: {
      type: String,
      default: 'small',
    },
    width: {
      type: String,
      default: '100px',
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
  },
  methods: {
    update(value) {
      this.$emit('input', value)
    },
  },
}
</script>

<style lang="less">
  .orange-input-select-container {
    position: relative;
  }

  .orange-input-select-container .orange-input-number-container {
    position: absolute;
    top: 0;
    right: 24px;
    bottom: 0;
    left: 0;

    .ant-input-number {
      width: 100%;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    .ant-input-number-handler-wrap {
      display: none;
    }
  }
</style>
