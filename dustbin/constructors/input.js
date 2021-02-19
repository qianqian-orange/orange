import * as R from 'ramda'
import Base from './base'

export default class Input extends Base {
  constructor(dataSource) {
    super(R.mergeDeepLeft({
      is: 'a-input',
    }, dataSource))
  }
}
