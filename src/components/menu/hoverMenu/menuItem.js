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
    content = '',
    eventEmitter = new EventEmitter(),
    dataSource = {},
    children = null,
    init = noop,
  }) {
    this.title = title
    this.key = key
    this.divider = divider
    this.props = props
    this.events = events
    this.icon = icon
    this.content = content
    this.eventEmitter = eventEmitter
    this.dataSource = dataSource
    this.children = children
    this.menu = null // 当menu实例添加此菜单项时会调用depend方法进行赋值
    this.bind()
    init.call(this)
  }

  bind() {
    keys(this.events, (fn, key) => { this.events[key] = fn.bind(this) })
  }

  on(type, fn) {
    if (!this.events[type]) this.events[type] = () => { this.emit(type) }
    else this.events[type] = compose(this.events[type], () => { this.emit(type) })
    this.eventEmitter.on(type, fn)
  }

  off(type, fn) {
    this.eventEmitter.off(type, fn)
  }

  emit(type) {
    this.eventEmitter.emit(type)
  }

  depend(menu) {
    this.menu = menu
    this.children && this.children.forEach((item) => {
      item.depend(menu)
    })
  }
}
