<template>
  <div>
    <div class="icon-item-container">
      <icon-type />
      <icon-color />
    </div>
    <icon-theme />
  </div>
</template>

<script>
import IconType from './type'
import IconColor from './color'
import IconTheme from './theme'

export default {
  name: 'ApperanceIcon',
  components: {
    IconType,
    IconColor,
    IconTheme,
  },
}
</script>

<style lang="less" scoped>
  .icon-item-container {
    display: flex;
    align-items: center;
  }
</style>
