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
              draggable
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
      activeKey: 'text',
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
        padding: 0 8px;
        cursor: move;
      }
    }
  }
</style>
