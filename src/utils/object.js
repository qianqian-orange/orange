export const keys = (obj, executor) => Object.keys(obj).forEach((key) => executor(obj[key], key))
