import EventEmitter from '@/lib/eventEmitter'

export function eventEmitterDecorator(Constructor) {
  function constructor(...args) {
    this.eventEmitter = new EventEmitter()
    Constructor.apply(this, args)
  }

  constructor.prototype = Object.create(Constructor.prototype, {
    constructor: {
      value: constructor,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  })

  constructor.prototype.on = function (type, fn) {
    return this.eventEmitter.on(type, fn)
  }

  constructor.prototype.off = function (type, fn) {
    this.eventEmitter.off(type, fn)
  }

  constructor.prototype.emit = function (type, ...args) {
    this.eventEmitter.emit(type, ...args)
  }

  // 绑定静态方法
  Object.setPrototypeOf(constructor, Constructor)

  return constructor
}
