import * as R from 'ramda'
import { Rectangle } from './index'

export class Checkbox extends Rectangle {
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
        attr: {},
      },
      component: {
        style: {
          position: 'relative',
          zIndex: 0,
        },
      },
    }, dataSource))
  }
}
