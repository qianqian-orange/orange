import * as R from 'ramda'
import { setStyle } from './util'
import { dblclickEvent } from '@/material/events'
import Base from './base'

export default class Rectangle extends Base {
  constructor(dataSource) {
    super(R.mergeDeepRight({
      is: 'orange-rectangle',
      props: {
        editable: {
          text: false,
          border: true,
          icon: false,
          stretch: true,
          move: true,
        },
      },
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
            color: 'rgb(0 0 0 / 40%)',
            x: 0,
            y: 2,
            dim: 6,
            spread: 0,
          },
        },
      },
    }, dataSource))

    this.children.forEach((item) => {
      item.parent = this
    })

    dblclickEvent.glass.call(this)

    this.on('zoom', (cur, prev) => {
      const percent = cur / prev
      const { stroke } = this.component.props
      setStyle(stroke.style, ['borderWidth'], percent)
    })
  }
}
