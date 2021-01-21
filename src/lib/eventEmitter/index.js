import { splice } from '@/utils/array'

export default class EventEmitter {
  constructor() {
    this.event = {}
  }

  on(type, fn) {
    if (!this.event[type]) this.event[type] = []
    this.event[type].push(fn)
  }

  off(type, fn) {
    if (!this.event[type]) return
    if (!fn) {
      this.event[type] = null
      return
    }
    splice(this.event[type], fn)
  }

  emit(type, ...args) {
    if (!this.event[type]) return
    this.event[type].forEach(fn => fn(...args))
  }
}
