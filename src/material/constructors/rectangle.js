import * as R from 'ramda'
import { setStyle } from './util'
import { dblclickEvent } from '@/material/events'
import compiler from '@/material/compiler'
import Base from './base'

export class Rectangle extends Base {
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
          event: true,
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
            shadowColor: 'rgb(0 0 0 / 40%)',
            shadowOffsetX: '0px',
            shadowOffsetY: '2px',
            shadowBlur: '6px',
            shadowSpread: '0px',
          },
        },
      },
      __constructor__: 'Rectangle',
    }, dataSource))

    this.children.forEach((item) => {
      item.parent = this
    })

    dblclickEvent.glass.call(this)

    this.on('zoom', (cur, prev) => {
      const percent = cur / prev
      const { stroke, shadow } = this.component.props
      setStyle(stroke.style, ['borderWidth'], percent)
      setStyle(shadow, ['shadowOffsetX', 'shadowOffsetY', 'shadowBlur', 'shadowSpread'], percent)
    })
  }

  compile(vm) {
    const {
      id,
      container,
      component,
      events,
    } = this
    return {
      id,
      is: 'orange-rectangle',
      props: {
        style: Object.assign({}, container.style, component.style),
        ...component.props,
      },
      events: compiler.event(events, vm),
      children: [],
    }
  }
}
