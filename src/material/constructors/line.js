import * as R from 'ramda'
import { setStyle } from './util'
import Base from './base'

export default class Line extends Base {
  constructor(dataSource) {
    super(R.mergeDeepRight({
      is: 'orange-line',
      component: {
        style: {
          minWidth: 0,
          minHeight: 0,
        },
      },
    }, dataSource))

    this.on('zoom', (cur, prev) => {
      const percent = cur / prev
      setStyle(this.component.style, ['borderTopWidth'], percent)
    })
  }
}