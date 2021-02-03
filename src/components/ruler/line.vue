<template>
  <div
    :class="['ruler-reference-line', direction, type]"
    :style="dataSource.style"
    :data-id="dataSource.id"
    :data-num="dataSource.num"
  >
    <span
      class="move"
      data-action="move"
    />
    <i
      class="remove iconfont icon-clear"
      data-action="remove"
    />
  </div>
</template>

<script>
// 线有两种类型: fixed 和 active
// 会执行两种动作: move和remove

export default {
  name: 'ReferenceLine',
  inject: ['direction'],
  props: {
    type: {
      type: String,
      default: 'fixed',
    },
    dataSource: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
  .ruler-reference-line {
    position: absolute;
    z-index: 100;

    .remove {
      .expand-click(2px);

      position: absolute;
      color: @textPrimaryColor;
      font-size: 12px;
      visibility: hidden;
      cursor: pointer;
    }

    &::before {
      content: attr(data-num);
      position: absolute;
      padding: 0 2px;
      color: @textPrimaryColor;
      font-size: 12px;
    }

    &.fixed::before {
      transform-origin: 0 0;
      transform: scale(.83);
    }

    &.xAxis {
      top: 0;
      padding-left: 5px;
      border-left: 1px solid rgb(235, 86, 72);

      &.fixed::before {
        top: 18px;
        left: 0;
      }

      &.active::before {
        top: 4px;
        left: 0;
        background-color: @lightBlack;
      }
    }

    &.yAxis {
      left: 0;
      padding-top: 5px;
      border-top: 1px solid rgb(235, 86, 72);

      &.fixed::before {
        top: 0;
        left: 18px;
      }

      &.active::before {
        top: -1px;
        left: 4px;
        transform-origin: 0 0;
        transform: rotate(-90deg);
      }
    }

    &.fixed {
      .move {
        position: absolute;
        top: 0;
        left: 0;
      }

      &:hover {
        .remove {
          visibility: visible;
        }
      }
    }

    &.xAxis.fixed {
      .remove {
        top: 18px;
        right: 8px;
      }

      .move {
        width: 6px;
        height: 18px;
        cursor: ew-resize;
      }
    }

    &.yAxis.fixed {
      .remove {
        top: 0;
        left: 18px;
        transform-origin: 0 0;
        transform: scaleY(-1);
      }

      .move {
        width: 18px;
        height: 6px;
        cursor: ns-resize;
      }
    }
  }
</style>
