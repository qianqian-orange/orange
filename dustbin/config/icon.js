import Icon from '../constructors/icon'

export default {
  'outlined-icon': new Icon({
    id: 'outlined-icon',
    draggable: true,
    component: {
      style: {
        width: '18px',
        height: '18px',
        color: 'rgb(24, 144, 255)',
      },
      props: {
        type: 'star',
        theme: 'outlined',
      },
    },
  }),
  'filled-icon': new Icon({
    id: 'filled-icon',
    draggable: true,
    component: {
      style: {
        width: '18px',
        height: '18px',
        color: 'rgb(24, 144, 255)',
      },
      props: {
        type: 'star',
        theme: 'filled',
      },
    },
  }),
  'twoTone-icon': new Icon({
    id: 'twoTone-icon',
    draggable: true,
    component: {
      style: {
        width: '18px',
        height: '18px',
      },
      props: {
        type: 'star',
        theme: 'twoTone',
        twoToneColor: 'rgb(24, 144, 255)',
      },
    },
  }),
}
