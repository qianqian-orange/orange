import Rectangle from './rectangle'
import { dblclickEvent } from '@/material/events'

export default class Button extends Rectangle {
  constructor(dataSource) {
    super(dataSource)

    dblclickEvent.glass.call(this)
  }
}
