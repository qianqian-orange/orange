<template>
  <div>
    <div
      v-for="(components, index) in items"
      :key="index"
      :class="['apperance-text-row-container', `col-${components.length}`]"
    >
      <div
        v-for="item in components"
        :key="item.name"
      >
        <component :is="item" />
      </div>
    </div>
  </div>
</template>

<script>
import TextFontSize from './components/fontSize'
import TextColor from './components/color'
import TextDecoration from './components/decoration'
import TextAlign from './components/align'
import TextVertical from './components/vertical'
import TextInterval from './components/interval'

export default {
  name: 'ApperanceText',
  data() {
    return {
      items: [
        [TextFontSize, TextColor],
        [TextDecoration, TextAlign],
        [TextVertical],
        [TextInterval],
      ],
    }
  },
}
</script>

<style lang="less" scoped>
  .apperance-text-row-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;

    &:last-child {
      margin-bottom: 0;
      margin-left: -4px;
    }

    > div {
      flex-basis: 100%;
    }

    &.col-2 > div {
      &:nth-of-type(1) {
        flex-basis: 50%;
      }

      &:nth-of-type(2) {
        flex-basis: 40%;
      }
    }
  }
</style>
