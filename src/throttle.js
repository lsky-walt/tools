/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 */
export function throttle(func, wait) {
  let throttleTimeout
  return function _() {
    const throttleContext = this,
      // eslint-disable-next-line prefer-rest-params
      throttleArgs = arguments

    if (!throttleTimeout) {
      throttleTimeout = setTimeout(() => {
        throttleTimeout = null
        func.apply(throttleContext, throttleArgs)
      }, wait)
    }
  }
}
