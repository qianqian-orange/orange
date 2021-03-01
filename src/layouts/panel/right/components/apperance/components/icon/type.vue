<template>
  <a-popover
    trigger="click"
    placement="bottom"
    overlay-class-name="orange-popover icon-popover"
  >
    <template #content>
      <el-scrollbar>
        <ul class="icon-list">
          <li
            v-for="item in items"
            :key="item"
            class="icon-item"
            @click="onChange(item)"
          >
            <a-icon :type="item" />
          </li>
        </ul>
      </el-scrollbar>
    </template>
    <div class="icon-type-container">
      <a-icon :type="store.iconType" />
      <span class="text-ellipsis">{{ store.iconType }}</span>
    </div>
  </a-popover>
</template>

<script>
export default {
  name: 'IconType',
  inject: ['store'],
  data() {
    return {
      items: [
        'step-backward', 'step-forward', 'fast-backward', 'fast-forward',
        'shrink', 'arrows-alt', 'down', 'up',
        'left', 'right', 'caret-up', 'caret-down',
        'caret-left', 'caret-right', 'up-circle', 'down-circle',
        'left-circle', 'right-circle', 'double-right', 'double-left',
        'vertical-left', 'vertical-right', 'vertical-align-top', 'vertical-align-middle',
        'vertical-align-bottom', 'forward', 'backward', 'rollback',
        'enter', 'retweet', 'swap', 'swap-left',
        'swap-right', 'arrow-up', 'arrow-down', 'arrow-left',
        'arrow-right', 'play-circle', 'up-square', 'down-square',
        'left-square', 'right-square', 'login', 'logout',
        'menu-fold', 'menu-unfold', 'border-bottom', 'border-horizontal',
        'border-inner', 'border-outer', 'border-left', 'border-right',
        'border-top', 'border-verticle', 'pic-center', 'pic-left',
        'pic-right', 'radius-bottomleft', 'radius-bottomright', 'radius-upleft',
        'radius-upright', 'fullscreen', 'fullscreen-exit',
      ],
    }
  },
  methods: {
    onChange(type) {
      this.store.iconType = type
    },
  },
}
</script>

<style lang="less" scoped>
  .icon-type-container {
    display: flex;
    align-items: center;
    width: 152px;
    height: 22px;
    padding: 0 6px;
    margin-right: 10px;
    border: 1px solid @deepGrey;
    font-size: 12px;
    background-color: @lightBlack;

    &:hover {
      cursor: pointer;
    }

    .anticon {
      margin-right: 6px;
    }
  }

  .icon-list {
    display: flex;
    flex-wrap: wrap;
    width: 172px;
    padding: 0 10px;

    .icon-item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 38px;
      height: 38px;
      border: 1px solid @deepGrey;
      color: @textPrimaryColor;
      cursor: pointer;

      &:hover {
        border-color: @deepBlue;
      }
    }
  }
</style>

<style lang="less">
  .icon-popover .ant-popover-inner .ant-popover-inner-content {
    height: 300px;
    padding: 10px 0 !important;
  }
</style>
