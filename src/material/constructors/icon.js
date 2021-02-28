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
      component: {
        style: {
          width: '18px',
          height: '18px',
          color: 'rgb(24, 144, 255)',
        },
        props: {
          type: 'star',
          twoToneColor: 'rgb(24, 144, 255)',
        },
      },
    }, dataSource))

    this.on('color', (value) => {
      const { component } = this
      component.props.twoToneColor = value
    })
  }
}
