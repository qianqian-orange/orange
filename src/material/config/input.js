import Input from '../constructors/input'
import Text from '../constructors/text'

export const input = {
  input: new Input({
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
        props: {
          editable: {
            text: false,
            stretch: {
              e: true,
            },
            move: false,
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
