import Rectangle from '../constructors/rectangle'
import Text from '../constructors/text'

export const input = {
  input: new Rectangle({
    id: 'input',
    component: {
      style: {
        position: 'relative',
        zIndex: 0, // 这里设置层级的目的是为了产生层级上下文，这样container的glass遮罩就可以遮住compoent的子元素
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
            height: '20px',
            color: '#bfbfbf',
          },
        },
      }),
    ],
  }),
}
