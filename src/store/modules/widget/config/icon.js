import Icon from '../constructors/icon'

export default {
  'outlined-icon': new Icon({
    id: 'outlined-icon',
    props: {
      type: 'star',
      theme: 'outlined',
    },
    style: {
      component: {
        color: 'rgb(24, 144, 255)',
      },
    },
  }),
  'filled-icon': new Icon({
    id: 'filled-icon',
    props: {
      type: 'star',
      theme: 'filled',
    },
    style: {
      component: {
        color: 'rgb(24, 144, 255)',
      },
    },
  }),
  'twoTone-icon': new Icon({
    id: 'twoTone-icon',
    props: {
      type: 'star',
      theme: 'twoTone',
      twoToneColor: 'rgb(24, 144, 255)',
    },
  }),
}
