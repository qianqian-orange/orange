<template>
  <div
    ref="left-panel"
    class="workspace-left-panel"
  >
    <a-tabs
      tab-position="left"
      :default-active-key="activeKey"
      @change="change"
    >
      <a-tab-pane
        v-for="({ category, text, widgetList }) in widgetCategories"
        :key="category"
        :tab="text"
      >
        <ul class="widget-list">
          <li
            v-for="widget in widgetList"
            :key="widget.id"
            class="widget-item"
          >
            <drag-widget
              :data-source="widget"
              :category="category"
              draggable
              @bootstrap="bootstrap"
            />
          </li>
        </ul>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import {
  mapMutations,
  mapState,
} from 'vuex'
import { WIDGET_CATEGORY_MAP } from './const'
import { UPDATE_WIDGET_DATA } from '@/store/modules/widget/mutation-types'
import DragWidget from '@/components/widget/dragWidget'

export default {
  name: 'WorkspaceLeftPanel',
  components: {
    DragWidget,
  },
  data() {
    return {
      activeKey: 'button',
    }
  },
  computed: {
    widgetCategories() {
      return Object.keys(this.widget).map(category => ({
        category,
        text: WIDGET_CATEGORY_MAP[category],
        widgetList: Object.keys(this.widget[category]).map(key => this.widget[category][key]),
      }))
    },
    ...mapState('widget', {
      widget: state => state,
    }),
  },
  methods: {
    bootstrap(el) {
      const id = el.id
      this[UPDATE_WIDGET_DATA]({
        log: {
          source: 'WorkspaceLeftPanel -> initData',
          reason: '更新组件的样式数据',
        },
        update: (state) => {
          const { style: { component } } = state[this.activeKey][id]
          const width = el.offsetWidth + 'px'
          const height = el.offsetHeight + 'px'
          component.width = component.minWidth = width
          component.height = component.minHeight = height
        },
      })
    },
    change(activeKey) {
      this.activeKey = activeKey
    },
    ...mapMutations('widget', [UPDATE_WIDGET_DATA]),
  },
}
</script>

<style lang="less" scoped>
  .workspace-left-panel {
    float: left;
    width: 251px;
    height: 100%;
    min-width: 251px;
    color: @textPrimaryColor;
    background-color: @black;

    .widget-list {
      .widget-item {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        cursor: move;
      }
    }
  }
</style>
