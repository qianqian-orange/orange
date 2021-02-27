<template>
  <a-select
    class="orange-select"
    dropdown-class-name="orange-select-dropdown-menu"
    v-bind="$props"
    v-on="$listeners"
  >
    <slot />
  </a-select>
</template>

<script>
export default {
  name: 'OrangeSelect',
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
    size: {
      type: String,
      default: 'small',
    },
  },
}
</script>

<style lang="less">
  .orange-select.ant-select {
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

  .ant-select-dropdown.orange-select-dropdown-menu {
    background-color: @deepGrey;
    border-radius: 2px;
    box-shadow: rgb(0 0 0 / 26%) 0 2px 7px 0, rgb(0 0 0 / 10%) 0 12px 36px 0;

    .ant-select-dropdown-menu {
      max-height: 300px;
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
