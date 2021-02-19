import Rectangle from '../constructors/rectangle'
import Icon from '../constructors/icon'
import Text from '../constructors/text'

export const button = {
  'search-primary-button': new Rectangle({
    id: 'search-primary-button',
    draggable: true,
    component: {
      style: {
        position: 'relative',
        zIndex: 0, // 这里设置层级的目的是为了产生层级上下文，这样container的glass遮罩就可以遮住compoent的子元素
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
        draggable: true,
        container: {
          style: {
            position: 'absolute',
            top: '8px',
            left: '15px',
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
        draggable: true,
        richText: '<p>搜索</p>',
        container: {
          style: {
            position: 'absolute',
            top: '5px',
            left: '37px',
          },
        },
        component: {
          style: {
            width: '28px',
            height: '20px',
            color: '#fff',
          },
        },
      }),
    ],
  }),
}
