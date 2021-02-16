<template>
  <a-menu-item
    :key="dataSource.key"
    :data-identification="identification"
    :class="[size, dataSource.glass && 'glass']"
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
import { MENU_ITEM, MENU_SIZE } from '@/const/menu'

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
  data() {
    return {
      // 配置.glass类可以很轻松判断当前点击的节点是不是menu的item
      identification: MENU_ITEM,
    }
  },
}
</script>
