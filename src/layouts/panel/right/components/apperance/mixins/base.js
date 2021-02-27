import store from '@/material/store'
import { UPDATE_WIDGET } from '@/material/store/mutation-types'

export default {
  inject: ['store'],
  computed: {
    container() {
      return this.store.dataSource.container
    },
    component() {
      return this.store.dataSource.component
    },
  },
  methods: {
    update(data) {
      store.emit(UPDATE_WIDGET, data)
    },
  },
}
