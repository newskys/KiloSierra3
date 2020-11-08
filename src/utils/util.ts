export function isEmpty(obj): boolean {
  return (
      obj === undefined ||
      obj === null ||
      obj === '' ||
      (Array.isArray(obj) && obj.length === 0) ||
      (typeof obj === 'object' && Object.keys(obj).length === 0)
  )
}

export function objectDeepCopy(obj): any {
  return JSON.parse(JSON.stringify(obj))
}
