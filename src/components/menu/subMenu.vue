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
      <a-menu-item
        v-if="!item.children"
        :key="item.key"
        :data-identification="identification"
        v-bind="item.props"
        v-on="item.events"
      >
        <span>{{ item.title }}</span>
      </a-menu-item>
      <a-menu-divider
        v-if="item.divider"
        :key="`${item.key}-divider`"
      />
      <sub-menu
        v-if="item.children"
        :key="item.key"
        :data-source="item"
        :identification="identification"
        v-bind="item.props"
      />
    </template>
  </a-sub-menu>
</template>

<script>
import { Menu } from 'ant-design-vue'

export default {
  name: 'SubMenu',
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    dataSource: {
      type: Object,
      default: () => ({}),
    },
    identification: {
      type: String,
      default: 'subMenu',
    },
  },
}
</script>
