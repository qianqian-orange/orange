<template>
  <div class="icon-theme-container">
    <span class="icon-theme-text">主题</span>
    <a-select
      :value="store.iconTheme"
      size="small"
      @select="update"
    >
      <a-select-option
        v-for="item in items"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </a-select-option>
    </a-select>
  </div>
</template>

<script>
export default {
  name: 'IconTheme',
  inject: ['store'],
  data() {
    return {
      items: [{
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
