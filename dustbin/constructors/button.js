import * as R from 'ramda'
import Base from './base'

export default class Button extends Base {
  constructor(dataSource) {
    super(R.mergeDeepLeft({
      is: 'a-button',
    }, dataSource))
  }
}
