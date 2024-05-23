/** 判断 path 是否为外链 */
export const isExternal = (path: string) => {
  const reg = /^(https?:|mailto:|tel:)/
  return reg.test(path)
}

/** 判断 url 是否是 http 或 https */
export function isHttp(url: string) {
  return url.includes('http://') || url.includes('https://')
}

/** 判断 字符串 是否是 ipv4 */
export function isIPv4(ip: string): boolean {
  const ipv4Pattern = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  return ipv4Pattern.test(ip)
}
