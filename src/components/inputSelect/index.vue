<template>
  <div
    class="orange-input-select-container"
    :style="{ width }"
  >
    <a-select
      dropdown-class-name="select-dropdown-menu"
      :value="value"
      size="small"
      @select="update"
    >
      <slot />
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

  .orange-input-select-container .ant-select {
    width: 100%;

    .ant-select-selection {
      height: 100%;
      border-color: @deepGrey;
      color: @greyWhite;
      font-size: 12px;
      background-color: @black;
      transition: none;
      box-shadow: none !important;

      .ant-select-arrow {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 24px;
        height: 100%;
        margin-top: 0;
        color: @textPrimaryColor;
        background-color: @lightBlack;

        .ant-select-arrow-icon {
          font-size: 8px;
        }
      }
    }

    &.ant-select-focused {
      .ant-select-selection {
        border-color: @deepGrey;

        .ant-select-arrow {
          color: @textPrimaryColor;
        }
      }
    }
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

  .ant-select-dropdown.select-dropdown-menu {
    background-color: @deepGrey;
    border-radius: 2px;
    box-shadow: rgb(0 0 0 / 26%) 0 2px 7px 0, rgb(0 0 0 / 10%) 0 12px 36px 0;

    .ant-select-dropdown-menu {
      padding: 0;
    }

    .ant-select-dropdown-menu-item {
      height: 28px;
      color: @greyWhite;
      font-size: 12px;
      line-height: 18px;

      &:hover {
        background-color: @lightBlack;
      }

      &.ant-select-dropdown-menu-item-selected {
        color: @greyWhite;
        background-color: @deepBlue !important;
      }
    }

    .ant-select-dropdown-menu-item-active {
      background-color: @deepGrey;
    }

    &.ant-select-dropdown--empty {
      .ant-select-dropdown-menu-item {
        height: auto;
      }

      .ant-empty {
        color: @greyWhite;
      }
    }
  }
</style>
