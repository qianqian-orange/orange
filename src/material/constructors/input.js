import Vue from 'vue'
import * as R from 'ramda'
import { placeholder } from '@/material/monitors'
import { Rectangle } from './index'

export class Input extends Rectangle {
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

    placeholder.call(this, ['props'], 'placeholder')
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
      is: 'a-input',
      props: {
        style: Object.assign({}, component.style, container.style),
        placeholder: props.placeholder,
      },
      events: {
        change: (e) => {
          vm.dataSource[bind] = e.target.value
        },
      },
      children: [],
    }
  }
}
