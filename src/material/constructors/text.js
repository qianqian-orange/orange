import * as R from 'ramda'
import store from '@/store'
import { UPDATE_CANVAS_WIDGET_DATA } from '@/store/modules/canvas/mutation-types'
import Base from './base'
import Bus, {
  DOCUMENT_MOUSE_DOWN,
  CANVAS_WIDGET_RESIZER_VISIBLE,
} from '@/utils/bus'
import {
  OVERFLOW_HIDDEN,
  BORDER_DASHED_LINE,
} from '@/components/widget/const/classes'
import { dblclickEvent } from '@/material/events'

export default class Text extends Base {
  constructor(dataSource) {
    super(R.mergeDeepRight({
      is: 'orange-rich-text',
      props: {
        editable: {
          text: true,
          border: false,
          icon: false,
          stretch: true,
          move: true,
        },
      },
      component: {
        style: {
          display: 'flex',
          alignItems: 'flex-start',
          height: '22px',
          color: '#b8bcbf',
          fontSize: '14px',
          fontWeight: 'normal',
          fontStyle: 'normal', // 可选值: italic
          textAlign: 'left',
          textDecoration: 'none', // 可选值: line-through underline
          letterSpacing: '0px',
        },
        props: {
          lineHeight: '22px',
          margin: '0 0 5px 0',
          zoom: 1,
        },
      },
    }, dataSource))
    const {
      richText = '',
    } = dataSource
    this.richText = richText

    dblclickEvent.glass.call(this)

    this.on('zoom', (zoom) => {
      this.component.props.zoom = zoom
    })

    this.on('fontSize', (value) => {
      const { component } = this
      // 经过测试，当字体大小与行高的间距小于2px时会出现滚动条，为了解决这个问题需要保证行高与字体大小间距在2px以上
      // 后续参考墨刀解决该问题
      const interval = 8
      component.props.lineHeight = `${value + interval}px`
    })

    this.container.on('dblclick', ({ vm }) => {
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
        vm.addClass(OVERFLOW_HIDDEN)
        // 取消文本全选
        vm.$refs.component.clearWindowSelectionRange()
        Bus.$off(DOCUMENT_MOUSE_DOWN, mousedown)
      }
      Bus.$on(DOCUMENT_MOUSE_DOWN, mousedown)
    })

    this.container.on('bootstrap', ({ vm }) => {
      vm.addClass(OVERFLOW_HIDDEN) // 设置容器的overflow为hidden
    })

    this.component.on('bootstrap', (vm) => {
      vm.setContent(this.richText) // 设置编辑器内容
    })

    this.component.on('change', (html) => {
      // dragWidget组件不要执行下面的逻辑，因为ricthText的值被修改后会
      // 影响mouseWidget组件的富文本p标签就会带上line-height, margin的样式
      if (!this.getInstance) return
      store.commit(`canvas/${UPDATE_CANVAS_WIDGET_DATA}`, {
        log: {
          source: 'material -> constructors -> text',
          reason: '修改文本内容',
        },
        update: () => {
          this.richText = html
        },
      })
    })
  }
}
