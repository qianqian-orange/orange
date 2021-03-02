import { Input, Text } from '../constructors'

export const input = {
  input: new Input({
    id: 'input',
    props: {
      attr: {
        group: 'username',
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
            zIndex: 1,
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
