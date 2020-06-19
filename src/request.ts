
import { isEmpty } from './value'

export interface RequestOptions {
  type: 'GET' | 'POST' | string,
  dataType: 'json' | string,
  data: Array<any>,
  [propName: string]: any
}

function request(options: RequestOptions): Promise<any> {
  return new Promise((resolve, reject) => {
    if (isEmpty(options)) {
      reject(new Error('缺失必要参数'))
      return
    }

    options['type'] = (options['type'] || 'GET').toUpperCase()
    options['dataType'] = options['dataType'] || 'json'
    options['data'] = isEmpty(options['data']) ? [] : options['data']

    const arr = []
    let params = ''

    for (const [key, value] of Object.entries(options['data'])) {
      arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    }

    params = arr.join('&')

    // 创建
    let xhr: XMLHttpRequest
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest()
    } else {
      alert('不支持IE6以下版本的浏览器')
      return
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        const _status = xhr.status
        if (_status >= 200 && _status < 300) {
          resolve(xhr)
        } else {
          reject(_status)
        }
      }
    }

    if (options['type'] == 'GET') {
      xhr.open('GET', `${options['url']}?${params}`, true)
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
      xhr.send(null)
    } else if (options['type'] == 'POST') {
      xhr.open('POST', options['url'], true)
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      xhr.send(params)
    }
  })
}


export { request }
