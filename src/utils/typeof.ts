/** 判断变量类型 */

export function isNumber(value: unknown) {
  return Object.prototype.toString.call(value) === '[object Number]'
}

export function isString(value: unknown) {
  return Object.prototype.toString.call(value) === '[object String]'
}

export function isBoolean(value: unknown) {
  return Object.prototype.toString.call(value) === '[object Boolean]'
}

export function isNull(value: unknown) {
  return Object.prototype.toString.call(value) === '[object Null]'
}

export function isUndefined(value: unknown) {
  return Object.prototype.toString.call(value) === '[object Undefined]'
}

export function isObject(value: unknown) {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export function isArray(value: unknown) {
  return Object.prototype.toString.call(value) === '[object Array]'
}

export function isDate(data: unknown) {
  return Object.prototype.toString.call(data) === '[object Date]'
}

export function isRegExp(value: unknown) {
  return Object.prototype.toString.call(value) === '[object RegExp]'
}

export function isSet(value: unknown) {
  return Object.prototype.toString.call(value) === '[object Set]'
}

export function isMap(value: unknown) {
  return Object.prototype.toString.call(value) === '[object Map]'
}
