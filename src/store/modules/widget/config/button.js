import Button from '../constructors/button'

export default {
  'primary-button': new Button({
    id: 'primary-button',
    props: {
      type: 'primary',
    },
    text: '按钮',
  }),
  'search-primary-button': new Button({
    id: 'search-primary-button',
    props: {
      type: 'primary',
      icon: 'search',
    },
    text: '搜索',
  }),
}
