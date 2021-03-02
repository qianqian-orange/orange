import Vue from 'vue'
import { eventEmitterDecorator } from '@/decorators'
import widget from './events/widget'
import snapshot from './events/snapshot'

const Store = eventEmitterDecorator(class Store {
  constructor() {
    this.zIndex = 1
    this.widgets = []
    this.initEventEmitter()
  }

  initEventEmitter() {
    // 数据初始化
    widget.init.call(this)
    // 数据销毁
    widget.destroy.call(this)
    // 新增组件
    widget.add.call(this)
    // 删除组件
    widget.remove.call(this)
    // 修改组件
    widget.update.call(this)
    // 置顶
    widget.toTop.call(this)
    // 置底
    widget.toBottom.call(this)
    // 添加快照
    snapshot.add.call(this)
  }
})

export default Vue.observable(new Store())
