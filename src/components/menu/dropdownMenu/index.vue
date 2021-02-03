<template>
  <!-- transition-name设置为空字符串是为了去掉过渡动画 -->
  <a-dropdown
    v-model="visible"
    transition-name=""
    overlay-class-name="dropdown-menu"
    placement="bottomCenter"
    @visibleChange="visibleChange"
  >
    <slot :visible="visible" />
    <template #overlay>
      <div :style="{ width }">
        <slot name="menu-extra" />
        <orange-menu
          :width="width"
          :size="size"
          :menus="menus"
        />
      </div>
    </template>
  </a-dropdown>
</template>

<script>
import base from '@/components/menu/mixins/base'
import OrangeMenu from '@/components/menu/menu'

export default {
  name: 'DropMenu',
  components: {
    OrangeMenu,
  },
  mixins: [base],
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    visibleChange(visible) {
      this.visible = visible
    },
  },
}
</script>

<style lang="less">
  .dropdown-menu {
    .ant-dropdown-content {
      transform: translateY(-3px);
    }
  }
</style>
