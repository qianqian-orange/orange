import * as R from 'ramda'

export const noop = () => {}

function extend(to, _from) {
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}

export function toObject(arr) {
  const res = {}
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    }
  }
  return res
}

export function defineProperty(object, property, descriptor) {
  Object.defineProperty(object, property, R.mergeDeepRight({
    enumerable: false,
    configurable: false,
  }, descriptor))
}

export const props = (keys, target) => {
  keys.forEach((key) => { target = target[key] })
  return target
}
