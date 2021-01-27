<template>
  <transition
    name="hover-menu"
    @enter="enter"
    @leave="leave"
  >
    <div
      v-show="visible"
      class="hover-menu-container"
    >
      <a-menu
        ref="hover-menu"
        mode="vertical"
        :style="{ width }"
        @click="click"
      >
        <template v-for="item in menus">
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
      </a-menu>
    </div>
  </transition>
</template>

<script>
import Bus, {
  CANVAS_HOVER_MENU,
  DOCUMENT_MOUSE_DOWN,
} from '@/utils/bus'
import { sleep } from '@/utils/timer'
import { MENU_IDENTIFICATION_MAP } from '@/const/menu'
import MenuItem from '@/components/menu/menuItem'
import SubMenu from '@/components/menu/subMenu'

let position = {}
const MENU_DEFAULT_WIDTH = '240px'

export default {
  name: 'HoverMenu',
  components: {
    MenuItem,
    SubMenu,
  },
  data() {
    return {
      width: MENU_DEFAULT_WIDTH,
      menus: [],
      visible: false,
    }
  },
  mounted() {
    Bus.$on(DOCUMENT_MOUSE_DOWN, this.mousedown)
    Bus.$on(CANVAS_HOVER_MENU, this.setData)
  },
  beforeDestroy() {
    Bus.$off(DOCUMENT_MOUSE_DOWN, this.mousedown)
    Bus.$off(CANVAS_HOVER_MENU, this.setData)
  },
  methods: {
    enter(el) {
      const { top, left, width, height } = this.calcPosition()
      el.style.top = top
      el.style.left = left
      el.style.width = width
      el.style.height = height
    },
    leave(el) {
      el.style.width = 0
      el.style.height = 0
    },
    calcPosition() {
      const {
        clientWidth,
        clientHeight,
      } = document.documentElement
      const {
        offsetWidth,
        offsetHeight,
      } = this.$refs['hover-menu'].$el
      // 与边界保持的距离
      const interval = 20
      // 与鼠标的偏移距离
      const offset = 4
      const top = position.top + offsetHeight + interval > clientHeight
        ? clientHeight - offsetHeight - interval : position.top
      const left = position.left + offsetWidth + interval > clientWidth
        ? position.left - offsetWidth - offset : position.left + offset
      return {
        top: top + 'px',
        left: left + 'px',
        width: offsetWidth + 'px',
        height: offsetHeight + 'px',
      }
    },
    mousedown(evt) {
      // 利用glass类给menu-item添加一个伪元素，方便将evt.tagret指向menu-item
      if (evt.target.dataset.identification === MENU_IDENTIFICATION_MAP.menuItem) return
      this.visible = false
    },
    setData(data) {
      this.menus = data.menus
      this.width = data.width || MENU_DEFAULT_WIDTH
      position = data.position
      // 这里秒延时的目的：
      // 一是因为需要用到菜单的宽高数据，所以需要等菜单数据渲染出来
      // 二是为了实现连续右键widget组件时能够过渡效果，100秒是有过渡总时长决定的
      sleep(100)
        .then(() => {
          this.visible = true
        })
    },
    click() {
      this.visible = false
    },
  },
}
</script>

<style lang="less" scoped>
  .hover-menu-container {
    position: fixed;
    z-index: 10000;
    overflow: hidden;
    width: 0;
    height: 0;
    box-shadow:
      rgba(0, 0, 0, 0.3) 0 2px 6px 0,
      rgba(0, 0, 0, 0.15) 0 10px 30px 0,
      rgb(37, 38, 38) 0 1px 0 0 inset;

    &.hover-menu-enter-active,
    &.hover-menu-leave-active {
      transition-property: opacity, width, height;
      transition-duration: .1s;
      transition-timing-function: ease-in-out;
      transform-origin: 0 0;
    }

    &.hover-menu-enter,
    &.hover-menu-leave-to {
      opacity: 0;
    }
  }
</style>

<style lang="less">
  .hover-menu-container .ant-menu.ant-menu-vertical.ant-menu-root,
  .hover-menu-popup .ant-menu.ant-menu-vertical.ant-menu-sub {
    padding: 4px 0;
    border-right: none;
    background-color: @lightBlack;
    transition: none;

    .ant-menu-item {
      .glass;

      height: 28px;
      margin-top: 0;
      margin-bottom: 0;
      color: @textPrimaryColor;
      font-size: 12px;
      line-height: 28px;
      transition: none;

      .left-icon {
        margin-right: 10px;
        font-size: 12px;
      }

      .right-icon {
        float: right;
        font-size: 14px;
      }

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
        .glass;

        height: 28px;
        margin: 0;
        color: @textPrimaryColor;
        font-size: 12px;
        line-height: 28px;
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
  }

  .hover-menu-popup.ant-menu-submenu-popup {
    z-index: 10000;
    background-color: transparent;
    border-radius: 0;

    .ant-menu {
      border-radius: 0;
    }
  }
</style>
