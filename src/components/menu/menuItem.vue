<template>
  <a-menu-item
    :key="dataSource.key"
    :class="size"
    v-bind="$props"
    v-on="$listeners"
  >
    <i
      v-if="dataSource.icon.left && dataSource.icon.left.visible"
      :class="['iconfont', 'left-icon', dataSource.icon.left.className]"
    />
    <span>{{ dataSource.title }}</span>
    <i
      v-if="dataSource.icon.right && dataSource.icon.right.visible"
      :class="['iconfont', 'right-icon', dataSource.icon.right.className]"
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
