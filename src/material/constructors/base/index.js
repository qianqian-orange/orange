import * as R from 'ramda'
import { eventEmitterDecorator } from '@/decorators'
import Component from './component'
import factory from '@/material/constructors/util'
import {
  bootstrap,
  click,
  snapshot,
} from './events'

export default eventEmitterDecorator(class Base {
  constructor({
    id = '',
    is = '',
    _zoom = 1,
    parent = null,
    children = [],
    container = {},
    component = {},
  }) {
    this.id = id
    this.is = is
    this._zoom = _zoom
    this.parent = parent
    this.children = children
    // 这里不要直接绑定vm实例，不然clone的时候消耗性能
    this.getInstance = null
    this.container = new Component(container)
    this.component = new Component({
      ...component,
      style: R.mergeDeepRight({
        minWidth: '8px',
        minHeight: '8px',
      }, component.style || {}),
    })
    this.initEvents()
    this.initEventEmitter()
  }

  initEvents() {
    ;['click', 'dblclick'].forEach((event) => {
      this.container.events[event] = (evt) => {
        // 如果是dragWidget组件，那么不需要执行下面的逻辑
        if (!this.getInstance) return
        const vm = this.getInstance()
        if (evt.target !== vm.$el) return
        this.container.emit(event, { evt, vm })
      }
    })
    ;['bootstrap', 'change'].forEach((event) => {
      this.component.events[event] = (...args) => {
        this.component.emit(event, ...args)
      }
    })
  }

  initEventEmitter() {
    // 绑定vm实例方法和显示resizer
    bootstrap.call(this)
    // 点击组件显示resizer
    click.call(this)
    // 添加快照
    snapshot.call(this)
  }

  // 计算组件相对于画布的top值和left值
  // 注意调用这个函数时组件已经挂载过画布
  position2canvas() {
    let top = 0
    let left = 0
    let widget = this
    while (widget) {
      const { style } = widget.getInstance().$el
      top += parseInt(style.top, 10)
      left += parseInt(style.left, 10)
      widget = widget.parent
    }
    return {
      top,
      left,
    }
  }

  get zoom() {
    return this._zoom
  }

  set zoom(value) {
    if (value === this._zoom) return
    const percent = value / this._zoom
    const computed = value => Math.floor(parseFloat(value, 10) * percent) + 'px'
    const update = (widget) => {
      widget._zoom = value
      const { container, component } = widget
      container.style.top = computed(container.style.top)
      container.style.left = computed(container.style.left)
      component.style.width = computed(component.style.width)
      component.style.height = computed(component.style.height)
      component.style.minWidth = computed(component.style.minWidth)
      component.style.minHeight = computed(component.style.minHeight)
      widget.children.forEach((item) => { update(item) })
      // text子类监听了zoom值的变化
      widget.emit('zoom', value)
    }
    update(this)
  }

  clone() {
    const widget = factory.call(this)
    return widget
  }
})
