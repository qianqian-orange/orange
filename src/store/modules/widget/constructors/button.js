import Base from './base'

export default class Button extends Base {
  constructor(dataSource) {
    super({
      ...dataSource,
      component: 'a-button',
    })
    const {
      component,
    } = this.style
    component.overflow = 'hidden'
  }

  clone() {
    return new Button(this)
  }
}
