import Base from './base'

export default class Icon extends Base {
  constructor(dataSource) {
    super({
      ...dataSource,
      component: 'a-icon',
    })
    const {
      container,
      component,
    } = this.style
    container.fontSize = 0
    component.overflow = 'hidden'
    component.fontSize = '18px'
  }

  clone() {
    return new Icon(this)
  }
}
