<template>
  <div>
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
    <a-button
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
    <div class="line" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '@afc163',
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

<style lang="less" scoped>
  .line {
    transform: rotate(-45deg);
    width: 10px;
    margin-top: 100px;
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: #666;
  }
</style>
