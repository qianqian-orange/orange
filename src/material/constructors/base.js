import * as R from 'ramda'
import store from '@/store'
import EventEmitter from '@/lib/eventEmitter'
import factory from './util'
import { UPDATE_CANVAS_WIDGET_DATA } from '@/store/modules/canvas/mutation-types'
import Bus, {
  CANVAS_WIDGET_RESIZE,
  CANVAS_WIDGET_BOOTSTRAP,
} from '@/utils/bus'

export default class Base {
  constructor({
    id = '',
    is = '',
    draggable = false,
    children = [],
    container = {},
    component = {},
  }) {
    this.id = id
    this.is = is
    this.draggable = draggable
    this.children = children
    // 这里不要直接绑定vm实例，不然clone的时候消耗性能
    this.getInstance = null
    this.container = R.mergeDeepRight({
      style: {},
      props: {},
      events: {},
      eventEmitter: new EventEmitter(),
    }, R.omit(['eventEmitter'], container)) // 这里需要去除掉eventEmitter，否则merge之后的eventEmitter属性上的原型方法会丢失
    this.component = R.mergeDeepRight({
      style: {
        minWidth: '8px',
        minHeight: '8px',
      },
      props: {},
      events: {},
      eventEmitter: new EventEmitter(),
    }, R.omit(['eventEmitter'], component))
    this.initEvents()
    this.initEventEmitter()
  }

  initEvents() {
    this.container.events.bootstrap = (evt) => {
      this.container.eventEmitter.emit('bootstrap', { evt, vm: evt.detail.vm })
    }
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
    this.container.eventEmitter.on('bootstrap', ({ vm }) => {
      if (this.draggable) return
      // 绑定组件对应的vm实例
      store.commit(`canvas/${UPDATE_CANVAS_WIDGET_DATA}`, {
        log: {
          source: 'material -> constructors -> base',
          reason: '绑定组件对应的vm实例',
        },
        id: this.id,
        update: ({ widget }) => {
          widget.getInstance = () => vm
        },
      })
      // 在新增组件的时候会依赖此事件，作用是显示resizer
      Bus.$emit(CANVAS_WIDGET_BOOTSTRAP, vm)
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
    const widget = factory.call(this)
    widget.children = widget.children.map((item) => factory.call(item))
    return widget
  }
}
