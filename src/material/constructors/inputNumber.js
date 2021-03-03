import Vue from 'vue'
import * as R from 'ramda'
import { Rectangle } from './index'

export class InputNumber extends Rectangle {
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
      __constructor__: 'InputNumber',
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
    Vue.set(vm.dataSource, bind, props.defaultValue)
    return {
      id,
      is: 'a-input-number',
      props: {
        style: Object.assign({}, component.style, container.style),
        ...R.pick(['defaultValue', 'min'], props),
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
