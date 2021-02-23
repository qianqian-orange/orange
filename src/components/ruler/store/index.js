import { eventEmitterDecorator } from '@/decorators'
import { splice } from '@/utils/array'
import { COORDINATE_DIRECTION_MAP } from '@/const/canvas'

const RulerStore = eventEmitterDecorator(class RulerStore {
  constructor() {
    this.visible = true // 全局控制标尺的显示
    this.referenceLine = {
      visible: true, // 全局控制参考线的显示
      [COORDINATE_DIRECTION_MAP.xAxis]: [], // 保存x轴的参考线
      [COORDINATE_DIRECTION_MAP.yAxis]: [], // 保存y轴的参考线
    }
  }

  add(direction, line) {
    this.referenceLine[direction].push(line)
    // 有添加新的参考线的时候显示全部参考线
    this.referenceLine.visible = true
    this.referenceLine[COORDINATE_DIRECTION_MAP.xAxis]
      .concat(this.referenceLine[COORDINATE_DIRECTION_MAP.yAxis])
      .forEach((line) => {
        line.visible = true
      })
  }

  remove(direction, index) {
    if (typeof index === 'number') splice(this.referenceLine[direction], index)
    else this.referenceLine[direction] = []
  }

  update({ update }) {
    update(this)
  }
})

export default function createStore() {
  return new RulerStore()
}
