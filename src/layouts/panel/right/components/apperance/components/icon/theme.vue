<template>
  <div class="icon-theme-container">
    <span class="icon-theme-text">主题</span>
    <a-select
      class="orange-select"
      :value="store.iconTheme"
      size="small"
      :options="options"
      dropdown-class-name="orange-select-dropdown"
      @select="update"
    />
  </div>
</template>

<script>
export default {
  name: 'IconTheme',
  inject: ['store'],
  data() {
    return {
      options: [{
        value: 'filled',
        label: '实心',
      }, {
        value: 'outlined',
        label: '描线',
      }, {
        value: 'twoTone',
        label: '双色',
      }],
    }
  },
  methods: {
    update(value) {
      this.store.iconTheme = value
    },
  },
}
</script>

<style lang="less" scoped>
  .icon-theme {
    &-container {
      display: flex;
      align-items: center;
      margin-top: 14px;

      .ant-select {
        width: 120px;
      }
    }

    &-text {
      margin-right: 10px;
      color: @textPrimaryColor;
      font-size: 12px;
    }
  }
</style>
