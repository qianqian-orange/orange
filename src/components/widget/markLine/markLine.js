import {
  getTarget,
} from '@/lib/document'

const ABSORB_INSTANCE = 3

export const MARKLINE_DIRECTION = {
  yAxis: 'yAxis',
  xAxis: 'xAxis',
}

export const MARKLINE_HANDLER = {
  [MARKLINE_DIRECTION.yAxis]: {
    targetFilter: widget => ({
      top: widget.top,
      bottom: widget.top + widget.height,
      yl: widget.left,
      yc: widget.left + widget.width / 2,
      yr: widget.left + widget.width,
    }),
    neighborFilter: widget => ({
      top: widget.top,
      right: widget.left + widget.width,
      bottom: widget.top + widget.height,
      left: widget.left,
      center: widget.left + widget.width / 2,
    }),
    setPlainLine: (line, data) => {
      line.style.top = data.startPoint + 'px'
      line.style.left = data.locatePoint + 'px'
      line.style.height = data.endPoint - data.startPoint + 'px'
    },
    setDistanceLine: (distanceLines, data) => {
      distanceLines.push(...data.distanceLines.map(line => ({
        style: {
          top: line.startPoint + 'px',
          left: line.locatePoint + 'px',
          width: '1px',
          height: line.endPoint - line.startPoint + 'px',
        },
        direction: MARKLINE_DIRECTION.yAxis,
        interval: line.endPoint - line.startPoint,
      })))
    },
    update(target, interval) {
      const el = getTarget()
      target.left += interval
      el.style.left = target.left + 'px'
      el.position.startX += interval
    },
  },
  [MARKLINE_DIRECTION.xAxis]: {
    targetFilter: widget => ({
      top: widget.left,
      bottom: widget.left + widget.width,
      xt: widget.top,
      xc: widget.top + widget.height / 2,
      xb: widget.top + widget.height,
    }),
    neighborFilter: widget => ({
      top: widget.left,
      right: widget.top,
      bottom: widget.left + widget.width,
      left: widget.top + widget.height,
      center: widget.top + widget.height / 2,
    }),
    setPlainLine: (line, data) => {
      line.style.top = data.locatePoint + 'px'
      line.style.left = data.startPoint + 'px'
      line.style.width = data.endPoint - data.startPoint + 'px'
    },
    setDistanceLine: (distanceLines, data) => {
      distanceLines.push(...data.distanceLines.map(line => ({
        style: {
          top: line.locatePoint + 'px',
          left: line.startPoint + 'px',
          width: line.endPoint - line.startPoint + 'px',
          height: '1px',
        },
        direction: MARKLINE_DIRECTION.xAxis,
        interval: line.endPoint - line.startPoint,
      })))
    },
    update(target, interval) {
      const el = getTarget()
      target.top += interval
      el.style.top = target.top + 'px'
      el.position.startY += interval
    },
  },
}

export const MARKLINE = {
  [MARKLINE_DIRECTION.yAxis]: ['yl', 'yc', 'yr'],
  [MARKLINE_DIRECTION.xAxis]: ['xt', 'xc', 'xb'],
}

export function rect(style) {
  return {
    width: parseInt(style.width, 10),
    height: parseInt(style.height),
    top: parseInt(style.top, 10),
    left: parseInt(style.left, 10),
  }
}

export default class MarkLine {
  constructor() {
    this.identification = null
    this.target = null
    this.neighbors = []
    this.associateNodes = []
  }

  // 判断当前节点的边是否与相邻节点的边共线
  collinear(node, locatePoint) {
    return node.left === locatePoint ||
      node.center === locatePoint ||
      node.right === locatePoint
  }

  // 获取线的两个端点
  plainLinePoint() {
    this.associateNodes.sort((a, b) => a.top - b.top)
    let node = this.associateNodes[0]
    let startPoint = node.top
    let endPoint = node.bottom
    for (let i = 1; i < this.associateNodes.length; i += 1) {
      node = this.associateNodes[i]
      if (node.bottom >= endPoint) endPoint = node.bottom
    }
    if (startPoint >= this.target.top) startPoint = this.target.top
    if (endPoint <= this.target.bottom) endPoint = this.target.bottom
    return {
      startPoint,
      endPoint,
    }
  }

  distanceLinePoint(startPoint, endPoint) {
    return {
      startPoint,
      endPoint,
    }
  }

  distanceLines() {
    const points = []
    const startPoint = this.target.top
    const endPoint = this.target.bottom
    this.associateNodes.forEach((node) => {
      if (node.top !== startPoint && node.top !== endPoint) points.push(node.top)
      if (node.bottom !== startPoint && node.bottom !== endPoint) points.push(node.bottom)
    })
    const distanceLines = []
    if (!points.length) return distanceLines
    points.push(startPoint, endPoint)
    points.sort((a, b) => a - b)
    const i1 = points.indexOf(startPoint)
    const i2 = points.lastIndexOf(endPoint)
    // 说明target处于最顶点
    if (i2 === 1) {
      distanceLines.push(this.distanceLinePoint(points[i2], points[i2 + 1]))
      return distanceLines
    }
    // 说明target处于最底端
    if (i1 === points.length - 2) {
      distanceLines.push(this.distanceLinePoint(points[i1 - 1], points[i1]))
      return distanceLines
    }
    if (i2 - i1 === 1) {
      distanceLines.push(this.distanceLinePoint(points[i1 - 1], points[i1]))
      distanceLines.push(this.distanceLinePoint(points[i2], points[i2 + 1]))
      return distanceLines
    }
    if (i1 === 0) {
      distanceLines.push(this.distanceLinePoint(points[i1], points[i1 + 1]))
    } else {
      distanceLines.push(this.distanceLinePoint(points[i1 - 1], points[i1]))
    }
    distanceLines.push(this.distanceLinePoint(points[i2 - 1], points[i2]))
    return distanceLines
  }

  line() {
    const locatePoint = this.target[this.identification]
    this.associateNodes.length = 0
    this.neighbors.forEach((node) => {
      if (this.collinear(node, locatePoint)) {
        this.associateNodes.push(node)
      }
    })
    if (!this.associateNodes.length) return null
    const { startPoint, endPoint } = this.plainLinePoint()
    return {
      locatePoint,
      startPoint,
      endPoint,
      distanceLines: this.distanceLines().map(line => ({
        ...line,
        locatePoint,
      })),
    }
  }

  adsorb(isAdsorb, update) {
    const locatePoint = this.target[this.identification]
    for (let i = 0; i < this.neighbors.length; i += 1) {
      let interval
      if (Math.abs(interval = this.neighbors[i].left - locatePoint) <= ABSORB_INSTANCE ||
        Math.abs(interval = this.neighbors[i].center - locatePoint) <= ABSORB_INSTANCE ||
        Math.abs(interval = this.neighbors[i].right - locatePoint) <= ABSORB_INSTANCE) {
        if (!isAdsorb) update(interval)
        return true
      }
    }
    return false
  }
}
