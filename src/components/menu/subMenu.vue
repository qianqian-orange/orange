<template>
  <a-sub-menu
    :key="dataSource.key"
    :class="size"
    v-bind="$props"
    v-on="$listeners"
  >
    <template #title>
      <span>{{ dataSource.title }}</span>
    </template>
    <template v-for="item in dataSource.children">
      <sub-menu
        v-if="item.children"
        :key="item.key"
        :size="size"
        :data-source="item"
        v-bind="item.props"
        v-on="item.events"
      />
      <menu-item
        v-else
        :key="item.key"
        :size="size"
        :data-source="item"
        v-bind="item.props"
        v-on="item.events"
      />
      <a-menu-divider
        v-if="item.divider"
        :key="`${item.key}-divider`"
      />
    </template>
  </a-sub-menu>
</template>

<script>
import { Menu } from 'ant-design-vue'
import { MENU_SIZE } from '@/const/menu'
import MenuItem from './menuItem'

export default {
  name: 'SubMenu',
  isSubMenu: true,
  components: {
    MenuItem,
  },
  props: {
    ...Menu.SubMenu.props,
    popupClassName: {
      type: String,
      default: 'orange-menu-popup',
    },
    popupOffset: {
      type: Array,
      default: () => [0, -4],
    },
    size: {
      type: String,
      default: MENU_SIZE.normal,
    },
    dataSource: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
