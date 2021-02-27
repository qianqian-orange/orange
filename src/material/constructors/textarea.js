import * as R from 'ramda'
import Rectangle from './rectangle'

export default class Textarea extends Rectangle {
  constructor(dataSource) {
    super(R.mergeDeepRight({
      props: {
        editable: {
          border: false,
        },
      },
    }, dataSource))
    const {
      lines = [],
    } = dataSource
    this.lines = lines
  }
}
