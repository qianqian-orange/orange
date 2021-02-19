import Text from '../constructors/text'

export default {
  text: new Text({
    id: 'text',
    draggable: true,
    richText: '<p>双击编辑文本</p>',
    component: {
      style: {
        width: '84px',
        height: '20px',
        fontSize: '14px',
      },
    },
  }),
}
