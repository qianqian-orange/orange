import * as R from 'ramda'
import uuid from '@/utils/uid'

export const setStyle = (target, styles, percent) => {
  const computed = value => Math.floor(parseFloat(value, 10) * percent) + 'px'
  styles.forEach((key) => {
    target[key] = computed(target[key])
  })
}

export default function factory() {
  // 注意需要先clone children，这样才能正确绑定children的parent的指向
  const children = this.children.map((item) => item.clone())
  // 由于R.clone方法会检测对象上是否有clone方法，如果有会使用该对象的clone方法，会导致死循环，所以
  // 通过Object.assign的方式去除掉对象原型上的clone方法
  // 这里使用R.omit方法一是为了取出对象原型上的clone方法，二是提高性能
  const dataSource = R.clone(R.omit(['children'], this))
  dataSource.id = `${dataSource.is}-${uuid()}`
  dataSource.children = children
  return new this.constructor(dataSource)
}
