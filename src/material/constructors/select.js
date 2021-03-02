import Vue from 'vue'
import * as R from 'ramda'
import { Rectangle } from './index'

export class Select extends Rectangle {
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
    Vue.set(vm.dataSource, bind, '')
    return {
      id,
      is: 'a-select',
      props: {
        style: Object.assign({}, component.style, container.style),
        options: props.options,
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
