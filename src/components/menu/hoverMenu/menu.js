import { keys } from '@/utils/object'

export default class Menu {
  constructor() {
    this.target = null
    this.event = null
    this.items = []
  }

  setData(data) {
    keys(data, (item, key) => { this[key] = item })
  }
}
