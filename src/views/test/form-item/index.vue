<template>
  <div style="width: 100%; height: 500px; padding-top: 20px; background-color: #252626;">
    <!-- <a-mentions
      v-model="value"
      placement="bottom"
      prefix="@"
      not-found-content="暂无相关数据"
      @change="onChange"
      @select="onSelect"
    >
      <a-mentions-option value="afc163">
        afc163
      </a-mentions-option>
      <a-mentions-option value="zombieJ">
        zombieJ1
      </a-mentions-option>
      <a-mentions-option value="yesmeck">
        yesmeck
      </a-mentions-option>
    </a-mentions> -->
    <!-- <a-input-number
      :default-value="100"
      :min="0"
      :max="100"
      :formatter="value => `${value}%`"
      @change="onChange"
    /> -->
    <!-- <a-button
      type="primary"
      icon="search"
    >
      搜索
    </a-button>
    <a-input placeholder="请输入..." />
    <a-textarea
      rows="1"
      placeholder="请输入..."
    />
    <div class="line" /> -->
    <!-- <div class="orange-input-number-container2">
      <span
        class="label"
      >X</span>
      <a-input-number
        :value="value"
        size="large"
        @change="onChange"
      />
    </div> -->
    <!-- <input type="color"> -->
    <orange-select />
  </div>
</template>

<script>
export default {
  data() {
    return {
      fontSize: '13px',
      value: 0,
      form: this.$form.createForm(this, { name: 'coordinated' }),
    }
  },
  methods: {
    onSelect(option) {
      console.log('select', option)
    },
    onChange(value) {
      console.log('Change:', value)
    },
  },
}
</script>

<style lang="less">
  .orange-select2 {
    .ant-select-selection {
      border-color: @black;
      color: @greyWhite;
      font-size: 12px;
      background-color: @black;
      box-shadow: none !important;

      .ant-select-arrow {
        width: 8px;
      }

      &:hover {
        border-color: @deepGrey;

        .ant-select-arrow {
          color: @textPrimaryColor;
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

  .select-dropdown-menu2 {
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
  }

  .orange-input-number-container2 {
    position: relative;

    .label {
      position: absolute;
      top: 50%;
      left: 6px;
      transform: translateY(-50%);
      z-index: 1;
      color: @textSecondaryColor;
      font-size: 14px;
    }
  }

  .orange-input-number-container2 .ant-input-number {
    border-color: @black;
    color: @textPrimaryColor;
    background-color: @black;
    transition: border 0.2s ease-out 0s;
    box-shadow: none;

    &:hover {
      border-color: rgb(69, 70, 71);
    }

    &.ant-input-number-focused {
      border-color: @deepBlue;
      outline: 1px solid @deepBlue;
      outline-offset: -2px;
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

    .ant-input-number-input {
      padding-left: 20px;
    }
  }
</style>
