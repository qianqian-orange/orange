import * as R from 'ramda'
import Base from './base'

export default class Textarea extends Base {
  constructor(dataSource) {
    super(R.mergeDeepLeft({
      is: 'a-textarea',
    }, dataSource))
  }
}
