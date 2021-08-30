import { isObject } from "./type"

function buildScheme(config) {
  const { path, param, protocol } = config
  const query = isObject(param)
    ? Object.keys(param)
        .map((key) => `${key}=${param[key]}`)
        .join("&")
    : ""

  return `${protocol}://${path}?${query}`
}

function generateIntent(config, options) {
  const { intent, fallback } = options
  const intentParam = Object.keys(intent)
    .map((key) => `${key}=${intent[key]};`)
    .join("")
  const intentTail = `#Intent;${intentParam}S.browser_fallback_url=${encodeURIComponent(
    fallback
  )};end;`
  let urlPath = buildScheme(config)

  urlPath = urlPath.slice(urlPath.indexOf("//") + 2)

  return `intent://${urlPath}/${intentTail}`
}

export { buildScheme, generateIntent }
