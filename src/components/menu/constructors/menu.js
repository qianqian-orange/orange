export default class Menu {
  constructor({ vm }) {
    this.dataSource = null
    this.event = null
    this.items = []
    this.vm = vm
  }

  setData({
    dataSource = null,
    event = null,
    items = [],
  }) {
    this.dataSource = dataSource
    this.event = event
    this.items = items
    items.forEach((item) => {
      item.depend(this)
    })
  }

  destroy() {
    this.dataSource = null
    this.event = null
    this.vm = null
    this.items.forEach((item) => {
      item.destroy()
    })
    this.items = []
  }
}
