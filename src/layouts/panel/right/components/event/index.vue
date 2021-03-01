<template>
  <div class="event-container">
    <a-button
      type="primary"
      size="small"
      :disabled="disabled"
      @click="onClick"
    >
      添加事件
    </a-button>
    <ul class="event-list">
      <li
        v-for="item in store.events"
        :key="item.id"
        class="event-item"
      >
        <div class="event-header-container">
          <span class="event-text">事件</span>
          <ul class="event-operator-list">
            <li
              class="event-operator-item"
              @click="edit(item)"
            >
              <a-tooltip placement="bottom">
                <template #title>
                  <span>编辑</span>
                </template>
                <a-icon type="edit" />
              </a-tooltip>
            </li>
            <li
              class="event-operator-item"
              @click="remove(item)"
            >
              <a-tooltip placement="bottom">
                <template #title>
                  <span>删除</span>
                </template>
                <a-icon type="delete" />
              </a-tooltip>
            </li>
          </ul>
        </div>
        <a-select
          :value="item.event"
          :options="options"
          dropdown-class-name="orange-select-dropdown"
          @select="onSelect(item, ...arguments)"
        />
      </li>
    </ul>
    <a-modal
      v-model="visible"
      title="代码"
      :width="528"
      dialog-class="orange-modal"
      @ok="ensure"
    >
      <code-editor v-model="code" />
    </a-modal>
  </div>
</template>

<script>
import uuid from '@/utils/uid'
import { splice } from '@/utils/array'

export default {
  name: 'Event',
  inject: ['store'],
  data() {
    return {
      visible: false,
      code: '',
      active: null,
      options: [{
        label: '单击',
        value: 'click',
      }, {
        label: '双击',
        value: 'dblclick',
      }, {
        label: '鼠标移入',
        value: 'mouseenter',
      }, {
        label: '鼠标移出',
        value: 'mouseleave',
      }],
    }
  },
  computed: {
    disabled() {
      return !this.store.props.editable.event
    },
  },
  methods: {
    onClick() {
      this.store.update({
        log: {
          sourece: 'layouts -> panel -> right -> components -> event',
          reason: '新增事件',
        },
        update: () => {
          this.store.events.push({
            id: uuid(),
            event: 'click',
            code: '(function (vm) {\n  console.log(\'hello world\')\n})(vm)',
          })
        },
      })
    },
    onSelect(item, value) {
      this.store.update({
        log: {
          sourece: 'layouts -> panel -> right -> components -> event',
          reason: '修改事件类型',
        },
        update: () => {
          item.event = value
        },
      })
    },
    edit(item) {
      this.code = item.code
      this.active = item
      this.visible = true
    },
    remove(event) {
      this.store.update({
        log: {
          sourece: 'layouts -> panel -> right -> components -> event',
          reason: '删除事件',
        },
        update: () => {
          splice(this.store.events, event)
        },
      })
    },
    ensure() {
      this.visible = false
      this.store.update({
        log: {
          sourece: 'layouts -> panel -> right -> components -> event',
          reason: '修改事件代码',
        },
        update: () => {
          this.active.code = this.code
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
  .event-container {
    padding: 14px 14px 6px 10px;

    .ant-btn-primary {
      width: 100%;
      margin-bottom: 12px;
      border-color: @deepBlue;
      color: #fff;
      font-size: 12px;
      background-color: @deepBlue;
    }

    .ant-btn-primary[disabled] {
      border-color: @lightBlack;
      color: @textSecondaryColor;
      background-color: @lightBlack;
    }

    .event-item {
      padding: 15px 5px 10px;
      margin-bottom: 14px;
      font-size: 14px;
      background-color: @lightBlack;
      border-radius: 4px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .event-header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 7px 13px 10px;
    }

    .event-text {
      color: @textSecondaryColor;
      font-size: 12px;
    }

    .event-operator-list {
      display: flex;
    }

    .event-operator-item {
      margin-right: 8px;
      color: @greyWhite;
      cursor: pointer;

      &:last-child {
        margin-right: 0;
      }
    }

    ::v-deep.ant-select .ant-select-selection {
      background-color: @lightBlack;
    }
  }
</style>
