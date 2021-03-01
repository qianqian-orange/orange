import Cascader from '../constructors/cascader'
import Icon from '../constructors/icon'

export const cascader = {
  cascader: new Cascader({
    id: 'cascader',
    props: {
      attr: {
        group: 'location',
        options: [{
          label: '广东省',
          value: '广东省',
          children: [{
            label: '汕头市',
            value: '汕头市',
            children: [{
              label: '潮南区',
              value: '潮南区',
            }, {
              label: '潮阳区',
              value: '潮阳区',
            }],
          }, {
            label: '深圳市',
            value: '深圳市',
            children: [{
              label: '南山区',
              value: '南山区',
            }, {
              label: '龙岗区',
              value: '龙岗区',
            }],
          }],
        }],
      },
    },
    component: {
      style: {
        width: '150px',
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
            right: '10px',
            zIndex: 1,
          },
        },
        component: {
          style: {
            width: '14px',
            height: '14px',
            color: '#d9d9d9',
          },
          props: {
            type: 'down',
            theme: 'outlined',
          },
        },
      }),
    ],
  }),
}
