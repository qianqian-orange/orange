import * as R from 'ramda'
import Rectangle from './rectangle'

export default class Textarea extends Rectangle {
  constructor(dataSource) {
    super(R.mergeDeepRight({
      props: {
        editable: {
          border: false,
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
    const {
      lines = [],
    } = dataSource
    this.lines = lines
  }
}
