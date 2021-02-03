<template>
  <dropdown-menu
    width="160px"
    :size="size"
    :menus="menus"
  >
    <template #default="{ visible }">
      <li
        :class="['tool-container', visible && 'active']"
        :style="{ width: '68px' }"
      >
        <div class="zoom-container">
          <span>{{ zoom * 100 }}%</span>
          <i class="arrow iconfont icon-arrowup" />
        </div>
        <span>缩放</span>
      </li>
    </template>
  </dropdown-menu>
</template>

<script>
import { mapState } from 'vuex'
import { MENU_SIZE } from '@/const/menu'
import {
  zoom50,
  zoom100,
  zoom200,
} from './config'
import DropdownMenu from '@/components/menu/dropdownMenu'

export default {
  name: 'Zoom',
  components: {
    DropdownMenu,
  },
  data() {
    return {
      size: MENU_SIZE.large,
      menus: [
        zoom50,
        zoom100,
        zoom200,
      ],
    }
  },
  computed: {
    ...mapState('canvas', {
      zoom: state => state.zoom,
    }),
  },
}
</script>

<style lang="less" scoped>
  @import "~@/layouts/header/index.less";

  .zoom-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 24px;
    font-weight: 700;

    .arrow {
      transform: rotate(180deg);
      margin-left: 4px;
      font-size: 12px;
      font-weight: 400;
    }
  }
</style>
