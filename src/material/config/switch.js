import { Switch, Rectangle } from '../constructors'

export const orangeSwitch = {
  orangeSwitch: new Switch({
    id: 'orangeSwitch',
    props: {
      attr: {
        group: 'remind',
      },
    },
    component: {
      style: {
        width: '44px',
        height: '22px',
        borderRadius: '100px',
      },
      props: {
        fill: {
          style: {
            backgroundColor: '#1890ff',
          },
        },
        stroke: {
          open: false,
        },
      },
    },
    children: [
      new Rectangle({
        id: 'rectangle',
        props: {
          editable: {
            border: false,
            stretch: false,
            move: false,
            event: false,
          },
        },
        container: {
          style: {
            position: 'absolute',
            top: '2px',
            right: '2px',
            zIndex: 1,
          },
        },
        component: {
          style: {
            width: '18px',
            height: '18px',
            borderRadius: '9px',
          },
          props: {
            stroke: {
              open: false,
            },
          },
        },
      }),
    ],
  }),
}
