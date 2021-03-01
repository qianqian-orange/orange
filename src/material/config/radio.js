import Radio from '../constructors/radio'
import Rectangle from '../constructors/rectangle'
import Text from '../constructors/text'

export const radio = {
  radio: new Radio({
    id: 'radio',
    props: {
      attr: {
        group: 'movie',
        value: '罗小黑战记',
      },
    },
    component: {
      style: {
        width: '100px',
        height: '22px',
      },
      props: {
        fill: {
          open: false,
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
            top: '3px',
            left: '2px',
            zIndex: 1,
          },
        },
        component: {
          style: {
            width: '16px',
            height: '16px',
            borderRadius: '8px',
          },
        },
      }),
      new Text({
        id: 'text',
        props: {
          editable: {
            // 只能右拉伸
            text: false,
            stretch: {
              e: true,
            },
            move: false,
            event: false,
          },
        },
        richText: '<p>罗小黑战记</p>',
        container: {
          style: {
            position: 'absolute',
            top: '0px',
            left: '26px',
            zIndex: 2,
          },
        },
        component: {
          style: {
            width: '72px',
            color: '#b8bcbf',
          },
        },
      }),
    ],
  }),
}
