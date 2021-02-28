<template>
  <div class="border-item-container">
    <a-checkbox
      :checked="store.fill.open"
      @change="onChange"
    />
    <color-picker
      :value="store.backgroundColor"
      @input="onInput"
    />
    <span class="border-item-text">填充</span>
  </div>
</template>

<script>
export default {
  name: 'BorderFill',
  inject: ['store'],
  methods: {
    onChange({ target: { checked } }) {
      this.store.update({
        log: {
          source: 'layouts -> panel -> right -> components -> apperance -> components -> border -> components -> fill',
          reason: '是否显示方框背景',
          detail: {
            open: checked,
          },
        },
        update: () => {
          this.store.fill.open = checked
        },
      })
    },
    onInput(value) {
      this.store.backgroundColor = value
    },
  },
}
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
