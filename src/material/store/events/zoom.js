import Vue from 'vue'
import store from '@/store'
import {
  UPDATE_WIDGET,
  ZOOM,
} from '@/material/store/mutation-types'

export default function () {
  // 由于vuex store的widget会引入组件配置，而组件配置又引入了该文件
  // 那么此store会优先于vuex store创建，且vuex store此时还没有创建完毕,
  // 所以此时不能获取到vuex store的属性和方法，因而采用Vue.nextTick的方式解决
  Vue.nextTick(() => {
    this.unwatch = store.watch((state) => state.canvas.zoom, (zoom) => {
      // 由于widgets是有用vuex store中canvas的wdigets属性进行绑定的，
      // 所以vuex store严格模式下直接修改widgets数据会报错，因而通过emit的方式解决
      this.emit(UPDATE_WIDGET, {
        log: {
          source: 'material -> store -> events -> zoom',
          reason: '修改缩放因子值',
        },
        update: () => {
          this.widgets.forEach((widget) => {
            widget.zoom = zoom
          })
          this.emit(ZOOM, zoom)
        },
      })
    })
  })
}
