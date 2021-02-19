import * as R from 'ramda'
import EventEmitter from '@/lib/eventEmitter'
import factory from './util'
import Bus, {
  CANVAS_WIDGET_RESIZE,
} from '@/utils/bus'

export default class Base {
  constructor({
    id = '',
    is = '',
    text = '',
    draggable = false,
    container = {},
    component = {},
  }) {
    this.id = id
    this.is = is
    this.text = text
    this.draggable = draggable
    this.getInstance = null
    this.container = R.mergeDeepLeft({
      style: {},
      props: {},
      events: {},
      eventEmitter: new EventEmitter(),
    }, R.omit(['eventEmitter'], container)) // 这里需要去除掉eventEmitter，否则merge之后的eventEmitter属性上的原型方法会丢失
    this.component = R.mergeDeepLeft({
      style: {
        minWidth: '12px',
        minHeight: '12px',
      },
      props: {},
      events: {},
      eventEmitter: new EventEmitter(),
    }, R.omit(['eventEmitter'], component))
    this.initEvents()
    this.initEventEmitter()
  }

  initEvents() {
    ;['click', 'dblclick'].forEach((event) => {
      this.container.events[event] = (evt) => {
        // 如果是dragWidget组件，那么不需要执行下面的逻辑
        if (this.draggable) return
        const vm = this.getInstance()
        if (evt.target !== vm.$el) return
        this.container.eventEmitter.emit(event, { evt, vm })
      }
    })
    ;['bootstrap', 'change'].forEach((event) => {
      this.component.events[event] = (...args) => {
        this.component.eventEmitter.emit(event, ...args)
      }
    })
  }

  initEventEmitter() {
    // 显示resizer
    this.container.eventEmitter.on('click', ({ evt }) => {
      Bus.$emit(CANVAS_WIDGET_RESIZE, evt.target)
    })
  }

  on(type, fn) {
    this.eventEmitter.on(type, fn)
  }

  off(type, fn) {
    this.eventEmitter.off(type, fn)
  }

  emit(type, ...args) {
    this.eventEmitter.emit(type, ...args)
  }

  clone() {
    return factory.call(this)
  }
}
