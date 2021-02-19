import * as R from 'ramda'
import Base from './base'

export default class Icon extends Base {
  constructor(dataSource) {
    super(R.mergeDeepRight({
      is: 'a-icon',
      container: {
        style: {
          fontSize: 0,
        },
      },
    }, dataSource))
  }
}
