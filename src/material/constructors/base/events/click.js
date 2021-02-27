import Bus, {
  CANVAS_WIDGET_RESIZE,
  APPERANCE_EVENT_DATASOURCE,
} from '@/utils/bus'

export function click() {
  const click = () => {
    const vm = this.getInstance()
    // 显示resizer
    Bus.$emit(CANVAS_WIDGET_RESIZE, vm.$el)
    // 显示左面板的外观和事件模块
    Bus.$emit(APPERANCE_EVENT_DATASOURCE, this)
  }

  this.container.on('click', click)
  this.component.on('click', click)
}
