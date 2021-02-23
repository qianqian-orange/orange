import { eventEmitterDecorator } from '@/decorators'

class Component {
  constructor({
    style = {},
    props = {},
    events = {},
  }) {
    this.style = style
    this.props = props
    this.events = events
  }
}

// 拓展eventEmitter属性
// 拓展on, off, emit原型方法
export default eventEmitterDecorator(Component)
