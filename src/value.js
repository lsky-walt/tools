import {
  isString,
  isArray,
  isObject,
  isFunc,
  isDate,
  isSet,
  isMap,
  isNan,
} from "./type"

function keys(data) {
  if (isArray(data)) {
    return data
  }
  if (typeof data === "object") {
    return Object.keys(data)
  }
  return []
}

function isEmpty(data) {
  if (data == null) {
    return true
  }
  if (isNan(data)) {
    return true
  }

  if ((isString(data) || isArray(data)) && data.length <= 0) {
    return true
  }
  if (isFunc(data) || isDate(data)) {
    return false
  }

  if (isObject(data) && keys(data).length !== 0) {
    return true
  }
  if ((isSet(data) || isMap(data)) && data.size <= 0) {
    return true
  }
  return false
}

function toUnique(data) {
  if (isArray(data)) {
    return [...new Set(data)]
  }

  if (isSet(data)) {
    return [...data]
  }
  return []
}

function checkNum(str) {
  let ret = ""

  //  如果第一个为 “.” 则清除
  if (str != "" && str.substr(0, 1) == ".") {
    return ret
  }

  //解决 粘贴不生效
  ret = str.replace(/^0*(0\.|[1-9])/, "$1")

  //清除“数字”和“.”以外的字符
  ret = ret.replace(/[^\d.]/g, "")

  //只保留第一个. 清除多余的
  ret = ret.replace(/\.{2,}/g, ".")
  ret = ret.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".")

  //只能输入两个小数
  ret = ret.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3")

  //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的数字
  if (ret.indexOf(".") < 0 && ret != "") {
    if (ret.substr(0, 1) == "0" && ret.length == 2) {
      ret = ret.substr(1, ret.length)
    }
  }

  return ret
}

export { isEmpty, toUnique, checkNum }
