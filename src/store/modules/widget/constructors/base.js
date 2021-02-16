import * as R from 'ramda'
import EventEmitter from '@/lib/eventEmitter'
import Bus, {
  CANVAS_WIDGET_RESIZE,
} from '@/utils/bus'

export default class Base {
  constructor({
    id = '',
    component = '',
    text = '',
    style = {},
    props = {},
  }) {
    this.id = id
    this.component = component
    this.text = text
    this.style = R.mergeDeepLeft({
      container: {},
      component: {},
    }, style)
    this.props = props
    this.getInstance = null
    this.initEvents()
    this.initEventEmitter()
  }

  initEvents() {
    this.events = {}
    ;['click', 'dblclick'].forEach((event) => {
      this.events[event] = (evt) => {
        const vm = this.getInstance()
        if (evt.target !== vm.$el) return
        this.eventEmitter.emit(event, { evt, vm })
      }
    })
  }

  initEventEmitter() {
    this.eventEmitter = new EventEmitter()
    // 显示resizer
    this.on('click', ({ evt }) => {
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
    throw Error('the subclass need to implement clone method')
  }
}
