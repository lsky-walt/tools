

function getType(data: any): string | null {
  const string = Object.prototype.toString.call(data)

  if (!string) { return null }
  return string.replace('[object', '').replace(']', '')
}


function isType(type: string): (obj: any) => boolean {
  return (obj: any) => getType(obj) === type
}


const isNull = isType('Null')
const isUndefined = isType('undefined')
const isArray = isType('Array')
const isObject = isType('Object')
const isNumber = isType('Number')
const isString = isType('String')
const isFunc = isType('Function')
const isDate = isType('Date')
const isError = isType('Error')
const isRegExp = isType('RegExp')
const isMap = isType('Map')
const isSet = isType('Set')
const isSymbol = isType('Symbol')
const isPromise = (obj: any) => isType('Promise')(obj) && isType('Function')(obj)

export {
  getType,
  isType,
  isNull,
  isUndefined,
  isArray,
  isObject,
  isNumber,
  isString,
  isFunc,
  isDate,
  isError,
  isRegExp,
  isMap,
  isSet,
  isSymbol,
  isPromise
}
