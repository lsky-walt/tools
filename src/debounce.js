/**
 * @desc 函数防抖
 * @params func 函数
 * @params wait 延迟执行毫秒数
 * @params immediate true 表示立即执行版， false 非立即执行
 */
export function debounce(func, wait, immediate) {
  let timeout
  return function _() {
    const contenxt = this,
      // eslint-disable-next-line prefer-rest-params
      args = arguments

    if (immediate) {
      const callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) {
        func.apply(contenxt, args)
      }
    } else {
      timeout = setTimeout(() => {
        func.apply(contenxt, args)
      }, wait)
    }
  }
}
