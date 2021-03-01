import { props, noop } from '@/utils'

export const attribute = {
  get: (keys, attr, filter, computed, monitor) => {
    return function () {
      const target = props(keys, this)
      const value = computed(filter(target[attr]), this.zoom)
      monitor.call(this)
      return value
    }
  },
  set: (keys, attr, filter, computed, monitor) => {
    return function (value) {
      this.update({
        log: {
          source: 'layouts -> panel -> right -> store',
          reason: '修改组件样式和属性',
          detial: {
            keys,
            attr,
            value,
          },
        },
        update: () => {
          const target = props(keys, this)
          target[attr] = filter(computed(value, this.zoom))
          monitor.call(this)
        },
      })
    }
  },
}

const filter = (translate) => {
  if (translate.int) {
    return {
      get: value => parseInt(value, 10),
      set: value => value + 'px',
    }
  }
  if (translate.float) {
    return {
      get: value => parseFloat(value, 10),
      set: value => value + 'px',
    }
  }
  if (translate.json) {
    return {
      get: value => JSON.stringify(value, null, 4),
      set: value => JSON.parse(value),
    }
  }
  return {
    get: value => value,
    set: value => value,
  }
}

export const factory = ({
  keys,
  attr,
  alias = '',
  translate = {},
  monitor = {},
}) => {
  return {
    keys,
    attr,
    alias,
    filter: filter(translate),
    computed: translate.zoom ? {
      set: (value, zoom) => Math.floor(value * zoom),
      get: (value, zoom) => Math.floor(value / zoom),
    } : {
      set: value => value,
      get: value => value,
    },
    monitor: {
      set: monitor.set || noop,
      get: monitor.get || noop,
    },
  }
}
