import Textarea from '../constructors/textarea'
import Text from '../constructors/text'
import Line from '../constructors/line'

function factory({
  id,
  lines,
  component,
  children,
}) {
  return new Textarea({
    id,
    component,
    lines,
    children: [
      ...lines,
      ...children,
    ],
  })
}

export const textarea = {
  textarea: factory({
    id: 'textarea',
    component: {
      style: {
        position: 'relative',
        zIndex: 0,
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
    lines: [
      new Line({
        id: 'longLine',
        container: {
          style: {
            position: 'absolute',
            top: '24px',
            left: '134px',
            zIndex: 1,
          },
        },
        component: {
          style: {
            transform: 'rotate(-45deg)',
            width: '12px',
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
            top: '26px',
            left: '140px',
            zIndex: 2,
          },
        },
        component: {
          style: {
            transform: 'rotate(-45deg)',
            width: '6px',
            borderTopWidth: '1px',
            borderTopStyle: 'solid',
            borderTopColor: '#666',
          },
        },
      }),
    ],
    children: [
      new Text({
        id: 'text',
        container: {
          style: {
            position: 'absolute',
            top: '4px',
            left: '11px',
            zIndex: 3,
          },
        },
        component: {
          style: {
            width: '54px',
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
