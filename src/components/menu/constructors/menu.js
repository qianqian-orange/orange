export default class Menu {
  constructor() {
    this.target = null
    this.event = null
    this.items = []
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
}
