import { factory } from '../util'

export default [
  factory({
    keys: ['props', 'attr'],
    attr: 'group',
  }),
  factory({
    keys: ['props', 'attr'],
    attr: 'value',
  }),
  factory({
    keys: ['props', 'attr'],
    attr: 'options',
    translate: { json: true },
  }),
]
