<template>
  <div
    ref="left-panel"
    class="workspace-left-panel"
  >
    <a-tabs
      tab-position="left"
    >
      <a-tab-pane
        key="button"
        tab="按钮"
      >
        <ul class="widget-list">
          <li
            v-for="widget in widgetList"
            :key="widget.id"
            class="widget-item"
          >
            <drag-widget
              :data-source="widget"
              draggable
            />
          </li>
        </ul>
      </a-tab-pane>
      <a-tab-pane
        key="input"
        tab="文本框"
      >
        文本框
      </a-tab-pane>
      <a-tab-pane
        key="select"
        tab="选择器"
      >
        选择器
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import {
  mapGetters,
  mapMutations,
} from 'vuex'
import { UPDATE_WIDGET_DATA } from '@/store/modules/global/mutation-types'
import DragWidget from '@/components/widget/dragWidget'

export default {
  name: 'WorkspaceLeftPanel',
  components: {
    DragWidget,
  },
  computed: {
    ...mapGetters('global', [
      'widgetList',
    ]),
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      this.widgetList.forEach(({ id }) => {
        const el = document.querySelector(`#${id}`)
        this[UPDATE_WIDGET_DATA]({
          id,
          update: (widget) => {
            const width = el.offsetWidth + 'px'
            const height = el.offsetHeight + 'px'
            widget.style.component = {
              width: width,
              height: height,
              minWidth: width,
              minHeight: height,
            }
          },
        })
      })
    },
    ...mapMutations('global', [UPDATE_WIDGET_DATA]),
  },
}
</script>

<style lang="less" scoped>
  .workspace {
    &-left-panel {
      width: 251px;
      color: @textPrimaryColor;
      background-color: @black;
    }

    .widget-list {
      .widget-item {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
      }
    }
  }
</style>
