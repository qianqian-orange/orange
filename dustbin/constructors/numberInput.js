import * as R from 'ramda'
import Base from './base'

export default class NumberInput extends Base {
  constructor(dataSource) {
    super(R.mergeDeepLeft({
      is: 'a-input-number',
    }, dataSource))
  }
}
