import Input from '../constructors/input'
import Textarea from '../constructors/textarea'

export default {
  'default-input': new Input({
    id: 'default-input',
    draggable: true,
    component: {
      style: {
        minHeight: '24px',
      },
      props: {
        size: 'default',
        placeholder: '请输入...',
      },
    },
  }),
  'ordinary-textarea': new Textarea({
    id: 'ordinary-textarea',
    draggable: true,
    component: {
      props: {
        rows: 1,
        placeholder: '请输入...',
      },
    },
  }),
}
