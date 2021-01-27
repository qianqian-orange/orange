<template>
  <a-sub-menu
    :key="dataSource.key"
    v-bind="$props"
    v-on="$listeners"
  >
    <template #title>
      <span>{{ dataSource.title }}</span>
    </template>
    <template v-for="item in dataSource.children">
      <menu-item
        v-if="!item.children"
        :key="item.key"
        :data-source="item"
        v-bind="item.props"
        v-on="item.events"
      />
      <a-menu-divider
        v-if="item.divider"
        :key="`${item.key}-divider`"
      />
      <sub-menu
        v-if="item.children"
        :key="item.key"
        :data-source="item"
        v-bind="item.props"
      />
    </template>
  </a-sub-menu>
</template>

<script>
import { Menu } from 'ant-design-vue'
import MenuItem from './menuItem'

export default {
  name: 'SubMenu',
  isSubMenu: true,
  components: {
    MenuItem,
  },
  props: {
    ...Menu.SubMenu.props,
    dataSource: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
