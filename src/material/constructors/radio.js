import Vue from 'vue'
import * as R from 'ramda'
import { Rectangle, Text } from './index'

export class Radio extends Rectangle {
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
    const text = this.children.find(item => item instanceof Text)
    // Vue.observable配置watch实现分组效果
    const config = {
      id,
      is: 'a-radio',
      props: Vue.observable({
        style: Object.assign({}, component.style, container.style),
        value: props.value,
        checked: false,
      }),
      events: {
        change: (e) => {
          vm.dataSource[bind] = e.target.value
        },
      },
      children: [text.compile()],
    }
    vm.$watch(`dataSource.${bind}`, (value) => {
      if (value === props.value) config.props.checked = true
      else config.props.checked = false
    })
    return config
  }
}
