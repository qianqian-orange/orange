import { factory } from '../util'

export const icon = [
  factory({
    keys: ['component', 'props'],
    attr: 'type',
    alias: 'iconType',
  }),
  factory({
    keys: ['component', 'style'],
    attr: 'color',
    alias: 'iconColor',
    monitor: {
      set() {
        this.dataSource.emit('color', this.iconColor)
      },
    },
  }),
  factory({
    keys: ['component', 'props'],
    attr: 'theme',
    alias: 'iconTheme',
  }),
]
