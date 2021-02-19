import Rectangle from './rectangle'

export default class Textarea extends Rectangle {
  constructor(dataSource) {
    super(dataSource)
    const {
      lines = [],
    } = dataSource
    this.lines = lines
  }
}
