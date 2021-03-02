import { InputNumber, Text } from '../constructors'

export const inputNumber = {
  inputNumber: new InputNumber({
    id: 'inputNumber',
    props: {
      attr: {
        group: 'amount',
      },
    },
    component: {
      style: {
        width: '90px',
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
            stretch: false,
            move: false,
            event: false,
          },
        },
        richText: '<p>0</p>',
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
            width: '12px',
            color: '#bfbfbf',
          },
          props: {
            disabled: true,
          },
        },
      }),
    ],
  }),
}
