import Bus, { CANVAS_WIDGET_RESIZE } from '@/utils/bus'

// 显示resizer
export function click() {
  this.container.on('click', ({ evt }) => {
    Bus.$emit(CANVAS_WIDGET_RESIZE, evt.target)
  })
}
