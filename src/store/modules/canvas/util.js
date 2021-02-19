export const scale = (style, zoom, percent) => {
  const {
    left,
    top,
  } = style
  style.left = Math.floor(parseInt(left, 10) * percent) + 'px'
  style.top = Math.floor(parseInt(top, 10) * percent) + 'px'
  style.transform = `scale(${zoom})`
}
