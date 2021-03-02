import { Button, Icon, Text } from '../constructors'

export const button = {
  'search-primary-button': new Button({
    id: 'search-primary-button',
    component: {
      style: {
        width: '82px',
        height: '32px',
        borderRadius: '4px',
      },
      props: {
        fill: {
          style: {
            backgroundColor: '#1890ff',
          },
        },
        stroke: {
          style: {
            borderColor: '#1890ff',
          },
        },
      },
    },
    children: [
      new Icon({
        id: 'icon',
        props: {
          editable: {
            stretch: false,
            move: false,
            event: false,
          },
        },
        container: {
          style: {
            position: 'absolute',
            top: '8px',
            left: '14px',
            zIndex: 1,
          },
        },
        component: {
          style: {
            width: '14px',
            height: '14px',
            color: '#fff',
          },
          props: {
            type: 'search',
            theme: 'outlined',
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
        richText: '<p>搜索</p>',
        container: {
          style: {
            position: 'absolute',
            top: '4px',
            left: '36px',
            zIndex: 2,
          },
        },
        component: {
          style: {
            width: '28px',
            color: '#fff',
          },
        },
      }),
    ],
  }),
}
