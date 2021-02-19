<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="less" scoped>
  #app {
    width: 100%;
    height: 100%;
  }
</style>

<style lang="less">
  .ant-input-number {
    .ant-input-number-input-wrap {
      height: 100%;

      .ant-input-number-input {
        height: 100%;
      }
    }
  }

  .anticon svg {
    width: 100%;
    height: 100%;
  }
</style>
