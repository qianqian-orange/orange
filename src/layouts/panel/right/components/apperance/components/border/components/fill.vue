<template>
  <div class="border-item-container">
    <orange-checkbox
      :checked="fill.open"
      @change="onChange(fill, 'open', value => value.target.checked, ...arguments)"
    />
    <color-picker
      :value="color"
      @input="onChange(fill.style, 'backgroundColor', value => value, ...arguments)"
    />
    <span class="border-item-text">填充</span>
  </div>
</template>

<script>
import base from '@/layouts/panel/right/components/apperance/mixins/base'

export default {
  name: 'BorderFill',
  mixins: [base],
  computed: {
    fill() {
      return this.component.props.fill
    },
    color() {
      return this.fill.style.backgroundColor
    },
  },
  methods: {
    onChange(target, key, computed, value) {
      this.update({
        log: {
          source: 'layouts -> panel -> right -> components -> apperance -> components -> border -> components -> fill',
          reason: '修改边框背景色数据和样式',
        },
        update: () => {
          target[key] = computed(value)
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
