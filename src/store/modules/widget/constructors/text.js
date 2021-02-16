import Base from './base'
import Bus, {
  DOCUMENT_MOUSE_DOWN,
  CANVAS_WIDGET_RESIZER_VISIBLE,
} from '@/utils/bus'
import {
  GLASS,
  OVERFLOW_HIDDEN,
  BORDER_DASHED_LINE,
} from '@/components/widget/const/classes'

export default class Text extends Base {
  constructor(dataSource) {
    super({
      ...dataSource,
      component: 'orange-rich-text',
    })
    this.on('dblclick', ({ vm }) => {
      vm.removeClass(GLASS)
      vm.removeClass(OVERFLOW_HIDDEN)
      vm.addClass(BORDER_DASHED_LINE)
      // 文本内容全选
      vm.$refs.component.selectAll()
      // 隐藏resizer
      Bus.$emit(CANVAS_WIDGET_RESIZER_VISIBLE, false)
      // 监听mousedown事件，当点击mouseWidget组件以外的元素时恢复glass类
      const mousedown = (evt) => {
        if (vm.$el.contains(evt.target)) return
        vm.removeClass(BORDER_DASHED_LINE)
        vm.addClass(GLASS)
        vm.addClass(OVERFLOW_HIDDEN)
        // 取消文本全选
        vm.$refs.component.clearWindowSelectionRange()
        Bus.$off(DOCUMENT_MOUSE_DOWN, mousedown)
      }
      Bus.$on(DOCUMENT_MOUSE_DOWN, mousedown)
    })
  }

  clone() {
    return new Text(this)
  }
}
