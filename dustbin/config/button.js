import Button from '../constructors/button'

export default {
  'primary-button': new Button({
    id: 'primary-button',
    text: '按钮',
    draggable: true,
    component: {
      props: {
        type: 'primary',
      },
    },
  }),
  'search-primary-button': new Button({
    id: 'search-primary-button',
    text: '搜索',
    draggable: true,
    component: {
      props: {
        type: 'primary',
        icon: 'search',
      },
    },
  }),
}
