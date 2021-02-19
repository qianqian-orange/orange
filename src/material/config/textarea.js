import Textarea from '../constructors/textarea'
import Text from '../constructors/text'
import Line from '../constructors/line'

function factory({
  id,
  lines,
  draggable,
  component,
  children,
}) {
  return new Textarea({
    id,
    draggable,
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
    draggable: true,
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
        draggable: true,
        container: {
          style: {
            position: 'absolute',
            top: '24px',
            left: '134px',
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
        draggable: true,
        container: {
          style: {
            position: 'absolute',
            top: '26px',
            left: '140px',
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
        draggable: true,
        container: {
          style: {
            position: 'absolute',
            top: '4px',
            left: '11px',
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
