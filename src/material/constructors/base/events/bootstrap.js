import store from '@/material/store'
import Bus, { CANVAS_WIDGET_RESIZE, APPERANCE_EVENT_DATASOURCE } from '@/utils/bus'
import { UPDATE_WIDGET } from '@/material/store/mutation-types'

export function bootstrap() {
  this.container.on('bootstrap', ({ vm }) => {
    // 将组件数据绑定到节点上
    vm.$el[this.id] = this
    // 绑定组件对应的vm实例
    store.emit(UPDATE_WIDGET, {
      log: {
        source: 'material -> constructors -> base',
        reason: '绑定组件对应的vm实例',
      },
      update: () => {
        this.getInstance = () => vm
      },
    })
    if (this.parent) return
    // 显示resizer
    Bus.$emit(CANVAS_WIDGET_RESIZE, vm.$el)
    // 显示左面板的外观和事件模块
    Bus.$emit(APPERANCE_EVENT_DATASOURCE, this)
  })
}
