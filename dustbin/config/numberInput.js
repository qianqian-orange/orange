import NumberInput from '../constructors/numberInput'

export default {
  'default-number-input': new NumberInput({
    id: 'default-number-input',
    draggable: true,
    component: {
      style: {
        minHeight: '24px',
      },
      props: {
        size: 'default',
        defaultValue: 0,
      },
    },
    props: {
      step: 1,
      min: 0,
      max: 100,
    },
  }),
}
