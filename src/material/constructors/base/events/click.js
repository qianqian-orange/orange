import Bus, {
  CANVAS_WIDGET_RESIZE,
  APPERANCE_EVENT_DATASOURCE,
} from '@/utils/bus'

export function click() {
  this.container.on('click', ({ evt }) => {
    // 显示resizer
    Bus.$emit(CANVAS_WIDGET_RESIZE, evt.target)
    // 显示左面板的外观和事件模块
    Bus.$emit(APPERANCE_EVENT_DATASOURCE, this)
  })
}
