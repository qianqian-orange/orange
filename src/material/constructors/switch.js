import Vue from 'vue'
import * as R from 'ramda'
import { Rectangle } from './index'

export class Switch extends Rectangle {
  constructor(dataSource) {
    super(R.mergeDeepRight({
      props: {
        editable: {
          border: false,
          stretch: false,
        },
      },
      component: {
        style: {
          position: 'relative',
          zIndex: 0,
        },
      },
      __constructor__: 'Switch',
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
    Vue.set(vm.dataSource, bind, props.defaultChecked)
    return {
      id,
      is: 'a-switch',
      props: {
        style: Object.assign({}, component.style, container.style),
        ...R.pick(['defaultChecked'], props),
      },
      events: {
        change: (value) => {
          vm.dataSource[bind] = value
        },
      },
      children: [],
    }
  }
}
