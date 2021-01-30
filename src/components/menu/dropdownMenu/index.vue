<template>
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
import OrangeMenu from '@/components/menu/menu'
import { MENU_DEFAULT_WIDTH, MENU_SIZE } from '@/const/menu'

export default {
  name: 'DropMenu',
  components: {
    OrangeMenu,
  },
  props: {
    width: {
      type: String,
      default: MENU_DEFAULT_WIDTH,
    },
    size: {
      type: String,
      default: MENU_SIZE.normal,
    },
    menus: {
      type: Array,
      default: () => [],
    },
  },
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
