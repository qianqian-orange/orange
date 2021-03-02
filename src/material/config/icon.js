import { Icon } from '../constructors'

export const icon = {
  'outlined-icon': new Icon({
    id: 'outlined-icon',
    component: {
      props: {
        theme: 'outlined',
      },
    },
  }),
  'filled-icon': new Icon({
    id: 'filled-icon',
    component: {
      props: {
        theme: 'filled',
      },
    },
  }),
  'twoTone-icon': new Icon({
    id: 'twoTone-icon',
    component: {
      props: {
        theme: 'twoTone',
      },
    },
  }),
}
