import Bus, { DOCUMENT_MOUSE_DOWN } from '@/utils/bus'
import { GLASS } from '@/components/widget/const/classes'

export const dblclickEvent = {
  // 双击组件时移除glass类
  glass() {
    this.container.eventEmitter.on('dblclick', ({ vm }) => {
      vm.removeClass(GLASS)
      // 监听mousedown事件，当点击mouseWidget组件以外的元素时恢复glass类
      const mousedown = (evt) => {
        if (vm.$el.contains(evt.target)) return
        vm.addClass(GLASS)
        Bus.$off(DOCUMENT_MOUSE_DOWN, mousedown)
      }
      Bus.$on(DOCUMENT_MOUSE_DOWN, mousedown)
    })
  },
}
