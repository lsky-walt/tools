
interface WindowExtra extends Window {
  ReactDOM?: any
}

export function addEventListener(target: Element, eventType: string, cb: (event?: Event) => void, option: any) {
  let callback: (e: Event) => void = cb
  /* eslint camelcase: 2 */
  if((window as WindowExtra).ReactDOM) {
    callback = (window as WindowExtra).ReactDOM.unstable_batchedUpdates ? function run(e: Event) {
      (window as WindowExtra).ReactDOM.unstable_batchedUpdates(cb, e)
    } : cb
  }

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


export function getParent(el: Element | null, target: string | Element) {
  if (!target) {
    return null
  }

  let temp = el
  while (temp) {
    if (typeof target === 'string') {
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