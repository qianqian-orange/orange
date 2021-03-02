import store from '@/store'
import DoubleLinkedList from '@/lib/dataStructure/doubleLinkedList'
import { isDev } from '@/config'
import Base from '@/material/constructors/base'
import {
  snapshot,
  logger,
} from '@/material/store/util'
import { splice } from '@/utils/array'
import {
  INIT_WIDGET_DATA,
  DESTROY_WIDGET_DATA,
  ADD_WIDGET,
  DELETE_WIDGET,
  UPDATE_WIDGET,
  TO_TOP,
  TO_BOTTOM,
} from '@/material/store/mutation-types'

const doubleLinkedList = new DoubleLinkedList()
const linkedListNodeMap = {}

function remove(id) {
  doubleLinkedList.remove(linkedListNodeMap[id])
  delete linkedListNodeMap[id]
  this.widgets = doubleLinkedList.toArray()
}

function add(widget) {
  // 由于快照可以将删除的组件添加回来，那么如果画布的缩放因子改变，组件的样式值也需要做相应修改
  const { state: { canvas } } = store
  widget.zoom = canvas.zoom
  linkedListNodeMap[widget.id] = doubleLinkedList.add(widget)
  this.widgets = doubleLinkedList.toArray()
}

// 由于通过调换元素位置会导致文本组件的editor异常，所以更改为修改组件的z-index控制层级关系
function toTop({ widget, compare }) {
  let widgets = null
  if (widget.parent) widgets = widget.parent.children
  else widgets = this.widgets
  widgets = Object.assign([], widgets).sort(compare)
  const index = widgets.findIndex(({ container: { style } }) => style.zIndex === widget.container.style.zIndex)
  const zIndex = +widgets[0].container.style.zIndex
  for (let i = 0; i < index; i += 1) {
    widgets[i].container.style.zIndex = widgets[i + 1].container.style.zIndex
  }
  widgets[index].container.style.zIndex = zIndex
  snapshot.add.call(this, {
    undo: () => {
      for (let i = index; i > 0; i -= 1) {
        widgets[i].container.style.zIndex = widgets[i - 1].container.style.zIndex
      }
      widgets[0].container.style.zIndex = zIndex
    },
    redo: () => {
      for (let i = 0; i < index; i += 1) {
        widgets[i].container.style.zIndex = widgets[i + 1].container.style.zIndex
      }
      widgets[index].container.style.zIndex = zIndex
    },
  })
}

export default {
  init() {
    this.on(INIT_WIDGET_DATA, logger.call(this, (data) => {
      // 开发模式下，代码热更新会导致请求数据多次导致重复添加相同的数据，会导致报错
      isDev && this.emit(DESTROY_WIDGET_DATA)
      this.zIndex = data.zIndex
      data.widgets.forEach((widget) => {
        add.call(this, Base.create(widget))
      })
    }))
  },
  destroy() {
    this.on(DESTROY_WIDGET_DATA, logger.call(this, () => {
      doubleLinkedList.destroy()
      this.widgets = []
    }))
  },
  // 新增组件
  add() {
    this.on(ADD_WIDGET, logger.call(this, ({ widget }) => {
      const { container: { style } } = widget
      style.zIndex = this.zIndex++
      add.call(this, widget)
      snapshot.add.call(this, {
        undo: () => {
          remove.call(this, widget.id)
        },
        redo: () => {
          add.call(this, widget)
        },
      })
    }))
  },
  // 删除组件
  remove() {
    this.on(DELETE_WIDGET, logger.call(this, ({ widget }) => {
      if (!widget.parent) {
        remove.call(this, widget.id)
        snapshot.add.call(this, {
          undo: () => {
            add.call(this, widget)
          },
          redo: () => {
            remove.call(this, widget.id)
          },
        })
        return
      }
      splice(widget.parent.children, widget)
      snapshot.add.call(this, {
        undo: () => {
          const { state: { canvas } } = store
          widget.zoom = canvas.zoom
          widget.parent.children.push(widget)
        },
        redo: () => {
          splice(widget.parent.children, widget)
        },
      })
    }))
  },
  // 修改组件
  update() {
    this.on(UPDATE_WIDGET, logger.call(this, ({ update }) => {
      update(this)
    }))
  },
  toTop() {
    this.on(TO_TOP, logger.call(this, ({ widget }) => {
      toTop.call(this, {
        widget,
        compare: (a, b) => +b.container.style.zIndex - +a.container.style.zIndex,
      })
    }))
  },
  toBottom() {
    this.on(TO_BOTTOM, logger.call(this, ({ widget }) => {
      toTop.call(this, {
        widget,
        compare: (a, b) => +a.container.style.zIndex - +b.container.style.zIndex,
      })
    }))
  },
}
