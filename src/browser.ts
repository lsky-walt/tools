
import { isObject } from './type-es6'

interface Params {
  [propName: string]: any
}

export interface BuildSchemeConfig {
  path: string,
  param: Params,
  protocol: string,
}

function buildScheme(config: BuildSchemeConfig): string {
  const { path, param, protocol } = config
  const query = isObject(param) ? Object.keys(param).map((key) => `${key}=${param[key]}`).join('&') : ''

  return `${protocol}://${path}?${query}`
}

interface IntentOptions {
  scheme: string,
  package: string,
  [propName: string]: any
}

interface IntentOptions {
  intent: IntentOptions,
  fallback: string
}

function generateIntent(config: BuildSchemeConfig, options: IntentOptions): string {
  const { intent, fallback } = options
  const intentParam = Object.keys(intent).map((key) => `${key}=${intent[key]};`).join('')
  const intentTail = `#Intent;${intentParam}S.browser_fallback_url=${encodeURIComponent(fallback)};end;`
  let urlPath = buildScheme(config)

  urlPath = urlPath.slice(urlPath.indexOf('//') + 2)

  return `intent://${urlPath}/${intentTail}`
}


export {
  buildScheme,
  generateIntent
}
