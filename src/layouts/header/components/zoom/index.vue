<template>
  <dropdown-menu
    width="160px"
    :size="size"
    :menus="menus"
  >
    <template #default="{ visible }">
      <li
        :class="['tool-item-container', visible && 'active']"
        :style="{ width: '68px' }"
      >
        <div class="zoom-container">
          <span>{{ zoom * 100 }}%</span>
          <i class="arrow iconfont icon-arrowup" />
        </div>
        <span>缩放</span>
      </li>
    </template>
    <template #menu-extra>
      <zoom-input />
    </template>
  </dropdown-menu>
</template>

<script>
import { MENU_SIZE } from '@/const/menu'
import {
  enlarge,
  narrow,
  zoom50,
  zoom100,
  zoom200,
  fitCavnas,
  zoom2area,
} from './config'
import DropdownMenu from '@/components/menu/dropdownMenu'
import ZoomInput from './input'

export default {
  name: 'Zoom',
  components: {
    DropdownMenu,
    ZoomInput,
  },
  data() {
    return {
      zoom: 1,
      size: MENU_SIZE.large,
      menus: [
        enlarge,
        narrow,
        zoom50,
        zoom100,
        zoom200,
        fitCavnas,
        zoom2area,
      ],
    }
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
