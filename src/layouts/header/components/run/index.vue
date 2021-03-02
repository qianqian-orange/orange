<template>
  <li
    :class="['tool-container', !widgets.length && 'disabled']"
    @click="play"
  >
    <a-icon type="play-circle" />
    <span>运行</span>
  </li>
</template>

<script>
import store from '@/material/store'
import { UPDATE_WIDGET } from '@/material/store/mutation-types'
import { WORKSPACE_RUN } from '@/const/router'

export default {
  name: 'Run',
  computed: {
    widgets() {
      return store.widgets
    },
  },
  methods: {
    play() {
      store.emit(UPDATE_WIDGET, {
        log: {
          source: 'layouts -> header -> components -> run',
          reason: '跳转到预览页面需要设置组件的缩放因子为1',
        },
        update: (state) => {
          state.widgets.forEach((widget) => {
            widget.zoom = 1
          })
        },
      })
      this.$router.push({
        name: WORKSPACE_RUN,
        params: {
          widgets: this.widgets,
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
@import "~@/layouts/header/index.less";
</style>
