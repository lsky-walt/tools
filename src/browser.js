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

const getBrowser = () => {
  const ua = window.navigator.userAgent || "",
    isAndroid = /android/i.test(ua),
    isIos = /iphone|ipad|ipod/i.test(ua),
    isWechat = /MicroMessenger\/([\d.]+)/i.test(ua),
    isWeibo = /(weibo).*weibo__([\d.]+)/i.test(ua),
    isQQ = /qq\/([\d.]+)/i.test(ua),
    isQzone = /qzone\/.*_qz_([\d.]+)/i.test(ua),
    // 安卓 chrome 浏览器，很多 app 都是在 chrome 的 ua 上进行扩展的
    isOriginalChrome =
      /chrome\/[\d.]+ Mobile Safari\/[\d.]+/i.test(ua) &&
      isAndroid &&
      ua.indexOf("Version") > 0,
    // chrome for ios 和 safari 的区别仅仅是将 Version/<VersionNum> 替换成了 CriOS/<ChromeRevision>
    // ios 上很多 app 都包含 safari 标识，但它们都是以自己的 app 标识开头，而不是 Mozilla
    isSafari =
      /safari\/([\d.]+)$/i.test(ua) &&
      isIos &&
      ua.indexOf("Crios") < 0 &&
      ua.indexOf("Mozilla") === 0

  return {
    isAndroid,
    isIos,
    isWechat,
    isWeibo,
    isQQ,
    isQzone,
    isOriginalChrome,
    isSafari,
  }
}

export { buildScheme, generateIntent, getBrowser }
