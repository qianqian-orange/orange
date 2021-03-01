import store from '@/material/store'
import { defineProperty } from '@/utils'
import { attribute } from './util'
import {
  general,
  text,
  border,
  shadow,
  icon,
} from './styles'
import attrs from './attrs'
import { DELETE_WIDGET, UPDATE_WIDGET } from '@/material/store/mutation-types'
import Bus, { APPERANCE_EVENT_DATASOURCE } from '@/utils/bus'

const fns = []

export class Store {
  constructor() {
    this.dataSource = null
    this.initEventListener()
  }

  initEventListener() {
    fns.push(store.on(DELETE_WIDGET, () => {
      this.dataSource = null
    }))
    fns.push(Bus.$on(APPERANCE_EVENT_DATASOURCE, (dataSource) => {
      this.dataSource = dataSource
    }))
  }

  get container() {
    return this.dataSource.container
  }

  get component() {
    return this.dataSource.component
  }

  get zoom() {
    return this.dataSource.zoom
  }

  get fill() {
    return this.component.props.fill
  }

  get stroke() {
    return this.component.props.stroke
  }

  get shadow() {
    return this.component.props.shadow
  }

  get props() {
    return this.dataSource.props
  }

  get events() {
    return this.dataSource.events
  }

  update(payload) {
    store.emit(UPDATE_WIDGET, payload)
  }

  destroy() {
    fns.forEach(fn => fn())
    fns.length = 0
    this.dataSource = null
  }
}

;[
  ...general,
  ...text,
  ...border,
  ...shadow,
  ...icon,
  ...attrs,
].forEach(({
  keys,
  attr,
  alias,
  filter,
  computed,
  monitor,
}) => {
  defineProperty(Store.prototype, alias || attr, {
    get: attribute.get(keys, attr, filter.get, computed.get, monitor.get),
    set: attribute.set(keys, attr, filter.set, computed.set, monitor.set),
  })
})

export default function createStore() {
  return new Store()
}
