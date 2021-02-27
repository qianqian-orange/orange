import * as R from 'ramda'
import Base from './base'

export default class Icon extends Base {
  constructor(dataSource) {
    super(R.mergeDeepRight({
      is: 'a-icon',
      props: {
        editable: {
          text: false,
          border: false,
          icon: true,
          stretch: true,
          move: true,
        },
      },
      container: {
        style: {
          fontSize: 0,
        },
      },
    }, dataSource))
  }
}
