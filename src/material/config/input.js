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
        container: {
          style: {
            position: 'absolute',
            top: '4px',
            left: '11px',
            zIndex: 1,
          },
        },
        component: {
          style: {
            width: '55px',
            height: '20px',
            color: '#bfbfbf',
          },
          props: {
            // 富文本的placholder的字符串中带有...会出现问题，所以改用实体字符的方式解决
            placeholder: '<p>请输入&hellip;</p>',
          },
        },
      }),
    ],
  }),
}
