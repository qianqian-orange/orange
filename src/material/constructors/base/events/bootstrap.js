import store from '@/material/store'
import { UPDATE_WIDGET } from '@/material/store/mutation-types'
import Bus, {
  CANVAS_WIDGET_BOOTSTRAP,
} from '@/utils/bus'

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
    // 在新增组件的时候会依赖此事件，作用是显示resizer
    Bus.$emit(CANVAS_WIDGET_BOOTSTRAP, vm)
  })
}
