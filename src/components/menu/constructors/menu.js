export default class Menu {
  constructor({ vm }) {
    this.target = null
    this.event = null
    this.items = []
    this.vm = vm
  }

  setData({
    target = null,
    event = null,
    items = [],
  }) {
    this.target = target
    this.event = event
    this.items = items
    items.forEach((item) => {
      item.depend(this)
    })
  }

  destroy() {
    this.target = null
    this.event = null
    this.vm = null
    this.items.forEach((item) => {
      item.destroy()
    })
    this.items = []
  }
}
