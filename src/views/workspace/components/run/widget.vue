<template>
  <!-- TODO: 使用jsx语法优化 -->
  <!-- 有v-html -->
  <component
    :is="dataSource.is"
    v-if="dataSource.html"
    v-bind="dataSource.props"
    v-on="dataSource.events"
    v-html="dataSource.html"
  >
    <widget
      v-for="(item, index) in dataSource.children"
      :key="index"
      :data-source="item"
    />
  </component>
  <!-- 无v-html -->
  <component
    :is="dataSource.is"
    v-else
    v-bind="dataSource.props"
    v-on="dataSource.events"
  >
    <widget
      v-for="item in dataSource.children"
      :key="item.id"
      :data-source="item"
    />
  </component>
</template>

<script>
export default {
  name: 'Widget',
  props: {
    dataSource: {
      type: Object,
      required: true,
    },
  },
}
</script>
