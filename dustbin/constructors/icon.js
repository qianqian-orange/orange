import * as R from 'ramda'
import Base from './base'

export default class Icon extends Base {
  constructor(dataSource) {
    super(R.mergeDeepLeft({
      is: 'a-icon',
    }, dataSource))
    this.container.style.fontSize = 0
  }
}
