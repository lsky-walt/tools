import { shortID } from "./uuid"
import { obtain } from "./value"
export function addEventListener(target, eventType, cb, option) {
  const callback = cb

  if (target.addEventListener) {
    target.addEventListener(eventType, callback, option)
  }

  return {
    remove: function remove() {
      if (target.removeEventListener) {
        target.removeEventListener(eventType, callback)
      }
    },
  }
}

export function getParent(el, target) {
  if (!target) {
    return null
  }

  let temp = el
  while (temp) {
    if (typeof target === "string") {
      if (temp.matches && temp.matches(target)) {
        return temp
      }
    } else if (temp === target) {
      return temp
    }

    temp = temp.parentElement
  }

  return null
}

export function isBrowser() {
  return typeof window !== "undefined"
}

/**
 * inject script to dom
 * @param {string} url script url
 * @param {string} id id
 * @returns id
 */
export function injectScript(url, id) {
  if (id && document.getElementById(id)) {
    const dom = document.getElementById(id)
    dom.parentNode.removeChild(dom)
  }
  const script = document.createElement("script")
  script.src = url
  script.async = true
  script.id = id
  document.body.appendChild(script)
  script.onreadystatechange = function () {
    if (
      !this.readyState ||
      this.readyState == "loaded" ||
      this.readyState == "complete"
    ) {
      console.log("complete load")
    }
  }
  return script
}

let count = 0
let timer = null
/**
 * loop target
 * @param {function} cb if condition is true, while do cb
 * @param {function} condition
 * @param {object} params extra params
 * @returns null
 */
export function checkTargetModuleHaveLoaded(
  cb,
  condition = () => false,
  params = {}
) {
  if (!isBrowser() || count > obtain(params, "count", 6)) {
    // 执行 clear && reset
    clearTimeout(timer)
    timer = null
    count = 0
    // 针对 失败的情况 需要回调
    obtain(params, "fail", false) && params.fail()
    return
  }

  timer = setTimeout(() => {
    if (condition()) {
      cb && cb()
      clearTimeout(timer)
      timer = null
      count = 0
    } else {
      count++
      checkTargetModuleHaveLoaded(cb, condition, params)
    }
  }, obtain(params, "time", 800))
}
