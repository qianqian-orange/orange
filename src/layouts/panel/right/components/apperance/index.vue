<template>
  <div class="apperance-container">
    <apperance-general />
    <a-collapse
      :default-active-key="['text', 'apperance']"
      expand-icon-position="right"
    >
      <a-collapse-panel
        key="text"
        header="文本"
      >
        <apperance-text />
      </a-collapse-panel>
      <a-collapse-panel
        key="apperance"
        header="外观"
      >
        <p>外观</p>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
import ApperanceGeneral from './components/general'
import ApperanceText from './components/text'

export default {
  name: 'Apperance',
  components: {
    ApperanceGeneral,
    ApperanceText,
  },
  inject: ['store'],
}
</script>

<style lang="less">
  .apperance-container .ant-collapse {
    border-color: @black;
    background-color: @black;

    & > .ant-collapse-item {
      border-color: @deepBlack;
      font-size: 12px;

      & > .ant-collapse-header {
        padding: 14px;
        color: @greyWhite;
      }

      .ant-collapse-arrow {
        font-size: 10px;
      }

      .ant-collapse-content {
        border-top: none;
        color: @textPrimaryColor;
        background-color: @black;
      }

      .ant-collapse-content > .ant-collapse-content-box {
        padding: 0 14px 14px;
      }
    }
  }
</style>
