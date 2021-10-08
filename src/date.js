import { isDate, isString, isNumber } from "./type"
import { isEmpty } from "./value"

/**
 * 替换指定日期或时间
 * @param {string} fmt ex: YYYY-MM-DD
 * @param {string} tar ex: M+
 * @param {string | number} value ex: '04' \ 4
 * @returns string
 */
const replaceTargetDateFormat = (fmt = "", tar = "", value) => {
  if (isEmpty(fmt) || isEmpty(tar) || isEmpty(value)) {
    return fmt
  }
  if (new RegExp(`(${tar})`).test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      RegExp.$1.length === 1 ? value : `00${value}`.substring(`${value}`.length)
    )
  }
  return fmt
}

/**
 * 根据 format 格式化时间
 * @param {string} fmt ex: YYYY-MM-DD
 * @param {date | string | number} date Date
 * @returns string
 */
const format = (fmt = "", date) => {
  if (isEmpty(date) || isEmpty(fmt)) {
    return fmt
  }
  let d = new Date()
  if (isDate(date)) {
    d = date
  }
  if (isNumber(date) || isString(date)) {
    d = new Date(date)
  }
  const o = {
    "M+": d.getMonth() + 1, // 月份
    "D+": d.getDate(), // 日
    "H+": d.getHours(), // 小时
    "m+": d.getMinutes(), // 分
    "s+": d.getSeconds(), // 秒
  }
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      `${d.getFullYear()}`.substr(4 - RegExp.$1.length)
    )
  }
  for (const k in o) {
    fmt = replaceTargetDateFormat(fmt, k, o[k])
  }
  return fmt
}

export { format, replaceTargetDateFormat }
