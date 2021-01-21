export const splice = (arr, start, deleteCount = 1, ...items) => arr.splice(typeof start === 'number' ? start : arr.findIndex(item => item === start), deleteCount, ...items)
