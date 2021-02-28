import { factory } from '../util'

// 边框设置
export const border = [
  factory({
    keys: ['component', 'style'],
    attr: 'borderRadius',
    translate: { int: true, zoom: true },
  }),
  factory({
    keys: ['fill', 'style'],
    attr: 'backgroundColor',
  }),
  factory({
    keys: ['stroke', 'style'],
    attr: 'borderColor',
  }),
  factory({
    keys: ['stroke', 'style'],
    attr: 'borderStyle',
  }),
  factory({
    keys: ['stroke', 'style'],
    attr: 'borderWidth',
    translate: { int: true, zoom: true },
  }),
]
