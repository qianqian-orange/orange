<template>
  <a-menu-item
    :key="dataSource.key"
    :data-identification="identification"
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
import { MENU_IDENTIFICATION_MAP } from '@/const/menu'

export default {
  name: 'MenuItem',
  isMenuItem: true,
  props: {
    ...Menu.Item.props,
    dataSource: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      identification: MENU_IDENTIFICATION_MAP.menuItem,
    }
  },
}
</script>
