import Vue from 'vue'
import * as R from 'ramda'
import { placeholder } from '@/material/monitors'
import { Rectangle } from './index'

export class Textarea extends Rectangle {
  constructor(dataSource) {
    super(R.mergeDeepRight({
      props: {
        editable: {
          border: false,
        },
      },
      component: {
        style: {
          position: 'relative',
          zIndex: 0,
        },
      },
      __constructor__: 'Textarea',
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
      is: 'a-textarea',
      props: {
        style: Object.assign({}, component.style, container.style),
        ...R.pick(['placeholder', 'autoSize'], props),
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
