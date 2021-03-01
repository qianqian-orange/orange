<template>
  <div class="attribute-container">
    <div
      v-for="item in items"
      :key="item.key"
      class="attribute-item-container"
    >
      <a-tooltip placement="left">
        <template #title>
          <span>{{ item.tip }}</span>
        </template>
        <span class="attribute-item-text">{{ item.label }}</span>
      </a-tooltip>
      <div class="attribute-item-input-container">
        <component
          :is="item.is"
          v-bind="item.props"
          v-on="item.events"
        />
      </div>
    </div>
    <a-empty
      v-if="!items.length"
      description="暂无相关数据"
    />
    <a-modal
      v-model="visible"
      title="代码"
      :width="528"
      dialog-class="orange-modal"
      @ok="ensure"
    >
      <code-editor
        v-model="code"
        :config="{ mode: 'application/json' }"
      />
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'Attribute',
  inject: ['store'],
  data() {
    return {
      code: '',
      visible: false,
    }
  },
  computed: {
    items() {
      const items = []
      if (typeof this.store.group !== 'undefined') {
        items.push({
          key: 'group',
          label: '分组',
          is: 'a-input',
          tip: '这个属性的作用是将group值相同的表单项归并到一起，修改同一个v-model绑定的数据源',
          props: {
            value: this.store.group,
            size: 'small',
          },
          events: {
            change: (e) => {
              this.store.group = e.target.value
            },
          },
        })
      }
      if (typeof this.store.value !== 'undefined') {
        items.push({
          key: 'value',
          label: 'value',
          is: 'a-input',
          tip: '提交给后端的表单项的值',
          props: {
            value: this.store.value,
            size: 'small',
          },
          events: {
            change: (e) => {
              this.store.value = e.target.value
            },
          },
        })
      }
      if (typeof this.store.options !== 'undefined') {
        items.push({
          key: 'options',
          label: '数据源',
          is: 'a-icon',
          tip: '设置表单项的数据源',
          props: {
            type: 'edit',
          },
          events: {
            click: () => {
              this.code = this.store.options
              this.visible = true
            },
          },
        })
      }
      return items
    },
  },
  methods: {
    ensure() {
      try {
        this.store.options = this.code
        this.visible = false
      } catch (e) {
        this.$message.error('JSON格式错误!')
      }
    },
  },
}
</script>

<style lang="less" scoped>
  .attribute-container {
    padding: 14px 14px 6px 10px;
  }

  .attribute-item {
    &-container {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }

      .anticon {
        color: @greyWhite;
        cursor: pointer;
      }
    }

    &-text {
      width: 36px;
      margin-right: 8px;
      color: @textPrimaryColor;
      font-size: 12px;
    }

    &-input-container {
      flex: 1;
    }
  }
</style>
