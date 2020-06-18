
import { isString, isArray, isObject, isFunc, isDate, isSet, isMap, isNan } from './type-es6'

function keys(data: object | Array<any>): any[] {
  if (isArray(data)) { return data }
  if (typeof data === 'object') { return Object.keys(data) }
  return []
}

function isEmpty(data: any): boolean {
  if (data == null) { return true }
  if (isNan(data)) { return true }

  if ((isString(data) || isArray(data)) && data.length <= 0) { return true }
  if (isFunc(data) || isDate(data)) { return false }

  if (isObject(data) && keys(data).length !== 0) { return true }
  if ((isSet(data) || isMap(data)) && data.size <= 0) { return true }
  return false
}


function toUnique(data: Array<any>): any[] {
  if (isArray(data)) { return [...new Set(data)] }
  if (isMap(data)) {
    return toUnique(Object.values(data))
  }
  if (isSet(data)) { return data }
  return []
}


export {
  isEmpty,
  toUnique
}
