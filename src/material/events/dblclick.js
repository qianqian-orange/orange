import Bus, { DOCUMENT_MOUSE_DOWN } from '@/utils/bus'
import { GLASS } from '@/components/widget/const/classes'

export const dblclickEvent = {
  // 双击组件时移除glass类
  glass() {
    this.container.on('dblclick', ({ evt, vm }) => {
      vm.removeClass(GLASS)
      // 监听mousedown事件，当点击mouseWidget组件以外的元素时恢复glass类
      const mousedown = (evt) => {
        if (vm.$el.contains(evt.target)) return
        vm.addClass(GLASS)
        Bus.$off(DOCUMENT_MOUSE_DOWN, mousedown)
      }
      Bus.$on(DOCUMENT_MOUSE_DOWN, mousedown)

      // 由于dblclick事件触发的时候glass还存在，所以需要在nextTick后在执行下面的逻辑
      vm.$nextTick(() => {
        const event = new Event('click')
        const el = document.elementFromPoint(evt.clientX, evt.clientY)
        el.dispatchEvent(event)
      })
    })
  },
}
