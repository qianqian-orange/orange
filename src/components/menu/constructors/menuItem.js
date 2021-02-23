import { noop } from '@/utils'
import { keys } from '@/utils/object'
import { compose } from '@/utils/functional'
import EventEmitter from '@/lib/eventEmitter'

export default class MenuItem {
  constructor({
    title,
    key,
    divider = false,
    props = {},
    events = {},
    icon = {},
    text = '',
    dataSource = {},
    children = null,
    menu = null,
    init = noop,
    destroy = noop,
  }) {
    this.title = title
    this.key = key
    this.divider = divider
    this.props = props
    this.events = events
    this.icon = icon
    this.text = text
    this.eventEmitter = new EventEmitter()
    this.dataSource = dataSource
    this.children = children
    this.menu = menu // 当menu实例添加此菜单项时会调用depend方法进行赋值
    this.destroy = destroy
    this.bind() // 绑定events事件的this指向
    init.call(this)
  }

  bind() {
    keys(this.events, (fn, key) => { this.events[key] = fn.bind(this) })
  }

  // 注意这里会手动插入emit逻辑，这样做的目的是当B依赖A的click事件时，A可以不用手动派发click事件，甚者，当
  // A不需要click事件时也可以不监听
  // 参考实例：mouseWidget的右键菜单配置
  on(type, fn) {
    if (!this.events[type]) this.events[type] = () => { this.emit(type) }
    else this.events[type] = compose(this.events[type], () => { this.emit(type) })
    this.eventEmitter.on(type, fn)
  }

  off(type, fn) {
    this.eventEmitter.off(type, fn)
  }

  emit(type, ...args) {
    this.eventEmitter.emit(type, ...args)
  }

  depend(menu) {
    this.menu = menu
    this.children && this.children.forEach((item) => {
      item.depend(menu)
    })
  }

  destroy() {
    this.destroy()
  }
}
