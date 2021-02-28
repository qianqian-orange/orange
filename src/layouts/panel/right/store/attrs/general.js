import { factory } from '../util'

// 通用设置
export const general = [
  factory({
    keys: ['container', 'style'],
    attr: 'top',
    translate: { int: true, zoom: true },
  }),
  factory({
    keys: ['container', 'style'],
    attr: 'left',
    translate: { int: true, zoom: true },
  }),
  factory({
    keys: ['component', 'style'],
    attr: 'width',
    translate: { int: true, zoom: true },
  }),
  factory({
    keys: ['component', 'style'],
    attr: 'height',
    translate: { int: true, zoom: true },
  }),
]
