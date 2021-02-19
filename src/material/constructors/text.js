import * as R from 'ramda'
import store from '@/store'
import { UPDATE_CANVAS_WIDGET_DATA } from '@/store/modules/canvas/mutation-types'
import Base from './base'
import Bus, {
  DOCUMENT_MOUSE_DOWN,
  CANVAS_WIDGET_RESIZER_VISIBLE,
} from '@/utils/bus'
import {
  GLASS,
  OVERFLOW_HIDDEN,
  BORDER_DASHED_LINE,
} from '@/components/widget/const/classes'

export default class Text extends Base {
  constructor(dataSource) {
    super(R.mergeDeepRight({
      is: 'orange-rich-text',
      component: {
        style: {
          display: 'flex',
          alignItems: 'flex-start',
          width: '84px',
          height: '20px',
          color: '#b8bcbf',
          fontSize: '14px',
          fontWeight: 'normal',
          fontStyle: 'normal', // 可选值: italic
          textAlign: 'left',
          textDecoration: 'none', // 可选值: line-through underline
          letterSpace: '0px',
        },
        props: {
          lineHeight: '20px',
          margin: '0 0 5px 0',
        },
      },
    }, dataSource))
    const {
      richText = '',
    } = dataSource
    this.richText = richText

    this.container.eventEmitter.on('dblclick', ({ vm }) => {
      vm.removeClass(GLASS)
      vm.removeClass(OVERFLOW_HIDDEN)
      vm.addClass(BORDER_DASHED_LINE)
      // 文本内容全选
      vm.$refs.component.selectAll()
      // 隐藏resizer
      Bus.$emit(CANVAS_WIDGET_RESIZER_VISIBLE, false)
      // 监听mousedown事件，当点击mouseWidget组件以外的元素时恢复glass类
      const mousedown = (evt) => {
        if (vm.$el.contains(evt.target)) return
        vm.removeClass(BORDER_DASHED_LINE)
        vm.addClass(GLASS)
        vm.addClass(OVERFLOW_HIDDEN)
        // 取消文本全选
        vm.$refs.component.clearWindowSelectionRange()
        Bus.$off(DOCUMENT_MOUSE_DOWN, mousedown)
      }
      Bus.$on(DOCUMENT_MOUSE_DOWN, mousedown)
    })

    this.container.eventEmitter.on('bootstrap', ({ vm }) => {
      vm.addClass(OVERFLOW_HIDDEN) // 设置容器的overflow为hidden
    })

    this.component.eventEmitter.on('bootstrap', (vm) => {
      vm.setContent(this.richText) // 设置编辑器内容
    })

    this.component.eventEmitter.on('change', (html) => {
      if (this.draggable) return
      store.commit(`canvas/${UPDATE_CANVAS_WIDGET_DATA}`, {
        log: {
          source: 'material -> constructors -> text',
          reason: '修改文本内容',
        },
        id: this.id,
        update: ({ widget }) => {
          widget.richText = html
        },
      })
    })
  }
}
