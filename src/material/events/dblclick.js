import Bus, { DOCUMENT_MOUSE_DOWN } from '@/utils/bus'
import { GLASS } from '@/components/widget/const/classes'

export const dblclickEvent = {
  // 双击组件时移除glass类
  glass() {
    this.container.on('dblclick', ({ evt, vm }) => {
      if (evt.target !== vm.$el) return
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
        // 由于a-modal组件会监听click事件，然后获取evt的pageX和pageY属性，所以这里需要加上，否则a-modal获取不到会报错
        event.pageX = evt.pageX
        event.pageY = evt.pageY
        const el = document.elementFromPoint(evt.clientX, evt.clientY)
        el.dispatchEvent(event)
      })
    })
  },
}
