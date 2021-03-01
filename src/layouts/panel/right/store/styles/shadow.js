import { factory } from '../util'

export const shadow = [
  factory({
    keys: ['shadow'],
    attr: 'shadowColor',
  }),
  factory({
    keys: ['shadow'],
    attr: 'shadowOffsetX',
    translate: { int: true, zoom: true },
  }),
  factory({
    keys: ['shadow'],
    attr: 'shadowOffsetY',
    translate: { int: true, zoom: true },
  }),
  factory({
    keys: ['shadow'],
    attr: 'shadowBlur',
    translate: { int: true, zoom: true },
  }),
  factory({
    keys: ['shadow'],
    attr: 'shadowSpread',
    translate: { int: true, zoom: true },
  }),
]
