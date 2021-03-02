import * as R from 'ramda'
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
        attr: {},
      },
      component: {
        style: {
          position: 'relative',
          zIndex: 0, // 这里设置层级的目的是为了产生层级上下文，这样container的glass遮罩就可以遮住compoent的子元素
        },
      },
    }, dataSource))
  }
}
