import * as R from 'ramda'
import Rectangle from './rectangle'

export default class Input extends Rectangle {
  constructor(dataSource) {
    super(R.mergeDeepRight({
      props: {
        editable: {
          border: false,
          stretch: {
            e: true,
            w: true,
          },
        },
      },
    }, dataSource))
  }
}