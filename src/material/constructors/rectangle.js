import * as R from 'ramda'
import Base from './base'

export default class Rectangle extends Base {
  constructor(dataSource) {
    super(R.mergeDeepRight({
      is: 'orange-rectangle',
      component: {
        props: {
          fill: {
            open: true,
            style: {
              backgroundColor: '#fff',
            },
          },
          stroke: {
            open: true,
            style: {
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'rgb(187, 187, 187)',
            },
          },
          shadow: {
            open: false,
            style: {
              boxShadow: 'rgb(0 0 0 / 40%) 0px 2px 6px 0px',
            },
          },
        },
      },
    }, dataSource))

    this.children.forEach((item) => {
      item.parent = this
    })
  }
}
