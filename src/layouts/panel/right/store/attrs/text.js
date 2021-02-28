import { factory } from '../util'

// 文本设置
export const text = [
  factory({
    keys: ['component', 'style'],
    attr: 'fontSize',
    translate: { int: true },
    monitor: {
      set() {
        this.dataSource.emit('fontSize', this.fontSize)
      },
    },
  }),
  factory({
    keys: ['component', 'style'],
    attr: 'color',
  }),
  factory({
    keys: ['component', 'style'],
    attr: 'fontWeight',
  }),
  factory({
    keys: ['component', 'style'],
    attr: 'fontStyle',
  }),
  factory({
    keys: ['component', 'style'],
    attr: 'textDecoration',
  }),
  factory({
    keys: ['component', 'style'],
    attr: 'textAlign',
  }),
  factory({
    keys: ['component', 'style'],
    attr: 'alignItems',
  }),
  factory({
    keys: ['component', 'style'],
    attr: 'letterSpacing',
    translate: { float: true },
  }),
  factory({
    keys: ['component', 'props'],
    attr: 'lineHeight',
    translate: { int: true },
  }),
  factory({
    keys: ['component', 'props'],
    attr: 'margin',
    translate: { int: true },
  }),
]
