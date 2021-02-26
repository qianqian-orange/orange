<template>
  <div>
    <div class="apperance-text-block">
      <div>
        <text-font-size />
      </div>
      <div>
        <text-color />
      </div>
    </div>
  </div>
</template>

<script>
import TextFontSize from './components/fontSize'
import TextColor from './components/color'

export default {
  name: 'ApperanceText',
  components: {
    TextFontSize,
    TextColor,
  },
}
</script>

<style lang="less" scoped>
  .apperance-text-block {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;

    &:last-child {
      margin-bottom: 0;
    }

    > div {
      &:first-child {
        flex-basis: 60%;
      }

      &:last-child {
        flex-basis: 40%;
      }
    }
  }
</style>
