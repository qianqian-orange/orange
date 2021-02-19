import * as R from 'ramda'
import uuid from '@/utils/uid'

export default function factory() {
  // 由于R.clone方法会检测对象上是否有clone方法，如果有会使用该对象的clone方法，会导致死循环，所以
  // 通过Object.assign的方式去除掉对象原型上的clone方法
  const dataSource = R.clone(Object.assign({}, this))
  dataSource.id = `${dataSource.is}-${uuid()}`
  return new this.constructor(dataSource)
}
