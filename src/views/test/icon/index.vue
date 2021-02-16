<template>
  <div>
    <div>
      <a-icon
        type="star"
        theme="twoTone"
        two-tone-color="rgb(24, 144, 255)"
      />
    </div>
    <a-icon
      type="up-circle"
      :style="{ color: '#f00' }"
    />
    <a-icon
      type="heart"
      theme="twoTone"
      two-tone-color="#f00"
    />
  </div>
</template>

<script>
import MouseWidget from '@/components/widget/mouseWidget'

export default {
  component: {
    MouseWidget,
  },
}
</script>

<style lang="less" scoped>
  .box {
    position: absolute;
    top: 100px;
    left: 100px;
    transform-origin: 0 0;
    transform: scale(1);
  }
</style>
