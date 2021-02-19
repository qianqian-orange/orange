import { isDev } from '@/config'

export default (store) => {
  // 参数列表: mutation state
  store.subscribe((mutation) => {
    if (isDev && mutation.payload.log) console.log(mutation.payload.log)
  })
}
