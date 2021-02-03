<template>
  <a-menu
    :class="[
      'orange-menu',
      hasLeftIcon && 'hasLeftIcon'
    ]"
    mode="vertical"
    :style="{ width }"
    @click="click"
  >
    <template v-for="item in menus">
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
  </a-menu>
</template>

<script>
import base from '@/components/menu/mixins/base'
import MenuItem from '@/components/menu/menuItem'
import SubMenu from '@/components/menu/subMenu'

export default {
  name: 'OrangeMenu',
  components: {
    MenuItem,
    SubMenu,
  },
  mixins: [base],
  computed: {
    hasLeftIcon() {
      return this.menus.filter(item => item.icon && item.icon.left).length
    },
  },
  methods: {
    click(...args) {
      this.$emit('click', ...args)
    },
  },
}
</script>

<style lang="less">
  .orange-menu.ant-menu.ant-menu-vertical.ant-menu-root,
  .orange-menu-popup .ant-menu.ant-menu-vertical.ant-menu-sub {
    padding: 4px 0;
    border-right: none;
    background-color: @lightBlack;
    transition: none;

    .left-icon {
      position: absolute;
      top: 50%;
      left: 12px;
      transform: translateY(-50%);
      font-size: 12px;
    }

    .right-icon {
      float: right;
      font-size: 12px;
    }

    .ant-menu-item {
      margin-top: 0;
      margin-bottom: 0;
      color: @textPrimaryColor;
      font-size: 12px;
      transition: none;

      &.ant-menu-item-selected {
        background-color: transparent;
      }

      &.ant-menu-item-active,
      &:active {
        color: #fff;
        background-color: @deepBlue;
      }

      &.ant-menu-item-disabled {
        color: @textSecondaryColor !important;
        background-color: transparent;
      }
    }

    .ant-menu-submenu {
      padding: 0;
      transition: none;

      .ant-menu-submenu-title {
        margin: 0;
        color: @textPrimaryColor;
        font-size: 12px;
        transition: none;

        &:active {
          background-color: transparent;
        }
      }

      .ant-menu-submenu-arrow {
        &::before,
        &::after {
          background-color: @textPrimaryColor;
          background-image: none;
          transition: none;
        }
      }
    }

    .ant-menu-submenu.ant-menu-submenu-active {
      background-color: @deepBlue;

      .ant-menu-submenu-title {
        color: #fff;
      }

      .ant-menu-submenu-arrow {
        &::before,
        &::after {
          background-color: #fff;
        }
      }
    }

    .ant-menu-submenu.ant-menu-submenu-disabled {
      .ant-menu-submenu-title {
        color: @textSecondaryColor !important;
      }

      .ant-menu-submenu-arrow {
        &::before,
        &::after {
          background-color: @textSecondaryColor !important;
        }
      }
    }

    .ant-menu-item-divider {
      background-color: @deepBlack;
    }

    .ant-menu-item.normal,
    .ant-menu-submenu.normal .ant-menu-submenu-title {
      height: 28px;
      line-height: 28px;
    }

    .ant-menu-item.small,
    .ant-menu-submenu.small .ant-menu-submenu-title {
      height: 26px;
      line-height: 26px;
    }

    .ant-menu-item.large,
    .ant-menu-submenu.large .ant-menu-submenu-title {
      height: 30px;
      line-height: 30px;
    }

    &.hasLeftIcon {
      .ant-menu-item,
      .ant-menu-submenu .ant-menu-submenu-title {
        padding-left: 32px;
      }
    }
  }

  .orange-menu-popup.ant-menu-submenu-popup {
    z-index: 10000;
    background-color: transparent;
    border-radius: 0;

    .ant-menu {
      border-radius: 0;
    }
  }
</style>
