import Vue from 'vue'
import * as R from 'ramda'
import { splice } from '@/utils/array'
import { Rectangle, Text } from './index'

export class Checkbox extends Rectangle {
  constructor(dataSource) {
    super(R.mergeDeepRight({
      props: {
        editable: {
          border: false,
          stretch: {
            e: true,
            w: true,
          },
        },
      },
      component: {
        style: {
          position: 'relative',
          zIndex: 0,
        },
      },
      __constructor__: 'Checkbox',
    }, dataSource))
  }

  compile(vm) {
    const {
      id,
      container,
      component,
      props,
    } = this
    const bind = props.bind
    Vue.set(vm.dataSource, bind, [])
    const text = this.children.find(item => item instanceof Text)
    const config = {
      id,
      is: 'a-checkbox',
      props: Vue.observable({
        style: Object.assign({}, component.style, container.style),
        value: props.value,
        checked: false,
      }),
      events: {
        change: (e) => {
          const index = vm.dataSource[bind].findIndex(item => item === e.target.value)
          if (index === -1) {
            vm.dataSource[bind].push(e.target.value)
            config.props.checked = true
          } else {
            splice(vm.dataSource[bind], index)
            config.props.checked = false
          }
        },
      },
      children: [text.compile()],
    }
    return config
  }
}
