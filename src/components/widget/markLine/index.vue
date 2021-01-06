<template>
  <mouse-widget
    :data-source="dataSource"
  >
    <!-- <template #markline>
      <h1>hello world</h1>
    </template> -->
  </mouse-widget>
</template>

<script>
import { mapMutations } from 'vuex'
import MouseWidget from '@/components/widget/mouseWidget'
import widgetMixin from '@/components/widget/mixins'
import { ADD_MOUSEMOVE_HANDLER } from '@/store/modules/document/mutation-types'

export default {
  name: 'MarkLineWidget',
  components: {
    MouseWidget,
  },
  mixins: [widgetMixin],
  mounted() {
    this[ADD_MOUSEMOVE_HANDLER]({
      id: this.dataSource.id,
      fn: ({ id }) => {
        // 说明当前拖拽的元素不是此节点
        if (this.dataSource.id !== id) return
        console.log(id)
      },
    })
  },
  methods: {
    ...mapMutations('document', [ADD_MOUSEMOVE_HANDLER]),
  },
}
</script>
