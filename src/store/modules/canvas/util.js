export const scale = (container, zoom, percent) => {
  const {
    left,
    top,
  } = container
  container.left = Math.floor(parseInt(left, 10) * percent) + 'px'
  container.top = Math.floor(parseInt(top, 10) * percent) + 'px'
  container.transform = `scale(${zoom})`
}
