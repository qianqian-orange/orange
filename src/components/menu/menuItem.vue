<template>
  <a-menu-item
    :key="dataSource.key"
    :class="size"
    v-bind="$props"
    v-on="$listeners"
  >
    <a-icon
      v-if="dataSource.icon.left && dataSource.icon.left.visible"
      :type="dataSource.icon.left.type"
      class="left-icon"
    />
    <span>{{ dataSource.title }}</span>
    <a-icon
      v-if="dataSource.icon.right && dataSource.icon.right.visible"
      :type="dataSource.icon.right.type"
      class="right-icon"
    />
  </a-menu-item>
</template>

<script>
import { Menu } from 'ant-design-vue'
import { MENU_SIZE } from '@/const/menu'

export default {
  name: 'MenuItem',
  isMenuItem: true,
  props: {
    ...Menu.Item.props,
    size: {
      type: String,
      default: MENU_SIZE.normal,
    },
    dataSource: {
      type: Object,
      required: true,
    },
  },
}
</script>
