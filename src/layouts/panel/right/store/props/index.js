import { factory } from '../util'

export default [
  factory({
    keys: ['props'],
    attr: 'bind',
  }),
  factory({
    keys: ['props'],
    attr: 'value',
  }),
  factory({
    keys: ['props'],
    attr: 'options',
    translate: { json: true },
  }),
]
