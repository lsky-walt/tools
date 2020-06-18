import curry from 'lodash.curry'


const isType = curry((name: string, value: any) => value && value.constructor && value.constructor.name === name)

// eslint-disable-next-line
export const isArray = Array.isArray
export const isUndef = (v: any) => v == null
export const isNotUndef = (v: any) => v != null
// eslint-disable-next-line
export const isNan = (a: any) => a !== a
export const isFunc = (f: any) => typeof f === 'function'
export const isNumber = (n: any) => typeof n === 'number'
export const isObject = (val: any) => val && typeof val === 'object' && !isArray(val)
export const isString = (s: any) => typeof s === 'string'
export const isDate = (val: any) => val instanceof Date
export const isError = (val: any) => val instanceof Error
export const isRegexp = (val: any) => val instanceof RegExp
export const isMap = isType('Map')
export const isSet = isType('Set')
export const isSymbol = isType('Symbol')
export const isPromise = (p: any) => p && (isType('Promise', p) || isFunc(p.then))
