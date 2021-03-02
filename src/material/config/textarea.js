import { Textarea, Text, Line } from '../constructors'

export const textarea = {
  textarea: new Textarea({
    id: 'textarea',
    props: {
      attr: {
        group: 'desc',
      },
    },
    component: {
      style: {
        width: '148px',
        height: '32px',
        borderRadius: '4px',
      },
      props: {
        stroke: {
          style: {
            borderColor: '#d9d9d9',
          },
        },
      },
    },
    children: [
      new Line({
        id: 'longLine',
        container: {
          style: {
            position: 'absolute',
            right: 0,
            bottom: '5px',
            zIndex: 1,
          },
        },
        component: {
          style: {
            transform: 'rotate(-45deg)',
            width: '12px',
            height: 0,
            borderTopWidth: '1px',
            borderTopStyle: 'solid',
            borderTopColor: '#666',
          },
        },
      }),
      new Line({
        id: 'shortLine',
        container: {
          style: {
            position: 'absolute',
            right: 0,
            bottom: '3px',
            zIndex: 2,
          },
        },
        component: {
          style: {
            transform: 'rotate(-45deg)',
            width: '6px',
            height: 0,
            borderTopWidth: '1px',
            borderTopStyle: 'solid',
            borderTopColor: '#666',
          },
        },
      }),
      new Text({
        id: 'text',
        props: {
          editable: {
            text: false,
            stretch: {
              e: true,
            },
            move: false,
            event: false,
          },
        },
        richText: '<p>请输入&hellip;</p>',
        container: {
          style: {
            position: 'absolute',
            top: '5px',
            left: '12px',
            zIndex: 3,
          },
        },
        component: {
          style: {
            width: '54px',
            color: '#bfbfbf',
          },
        },
      }),
    ],
  }),
}
