import * as R from 'ramda'
import compiler from '@/material/compiler'
import { Rectangle } from './index'

export class Button extends Rectangle {
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
          zIndex: 0, // 这里设置层级的目的是为了产生层级上下文，这样container的glass遮罩就可以遮住compoent的子元素
        },
      },
      __constructor__: 'Button',
    }, dataSource))
  }

  compile(vm) {
    const {
      id,
      container,
      component,
      props,
      events,
    } = this
    const children = this.children.map(item => item.compile())
    return {
      id,
      is: 'a-button',
      props: {
        // 注意这里的合并顺序
        style: Object.assign({}, component.style, container.style),
        type: props.type,
      },
      events: compiler.event(events, vm),
      children,
    }
  }
}
