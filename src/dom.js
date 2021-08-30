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
