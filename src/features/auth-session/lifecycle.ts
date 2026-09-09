/** 浏览器同源范围内统一串行化会写入 Refresh Token Cookie 的认证请求。 */
const AUTH_LIFECYCLE_LOCK = 'continew-auth-lifecycle'

interface WebLockManager {
  request: <T>(
    name: string,
    options: { mode: 'exclusive' },
    callback: () => Promise<T>,
  ) => Promise<T>
}

let fallbackTail: Promise<void> = Promise.resolve()

const runInCurrentPageQueue = async <T>(callback: () => Promise<T>): Promise<T> => {
  const previous = fallbackTail
  let release: () => void = () => {}
  fallbackTail = new Promise<void>((resolve) => {
    release = resolve
  })
  await previous
  try {
    return await callback()
  } finally {
    release()
  }
}

/**
 * 串行执行登录、刷新和退出。
 *
 * Web Locks 能覆盖同源多标签页，从根源上阻止迟到响应的 Set-Cookie 覆盖新会话；
 * 不支持 Web Locks 的浏览器仍保证当前页面内不发生认证响应乱序。
 */
export const withAuthLifecycleLock = async <T>(callback: () => Promise<T>): Promise<T> => {
  const lockManager = typeof navigator === 'undefined'
    ? undefined
    : (navigator as Navigator & { locks?: WebLockManager }).locks
  if (lockManager) {
    return lockManager.request(AUTH_LIFECYCLE_LOCK, { mode: 'exclusive' }, callback)
  }
  return runInCurrentPageQueue(callback)
}
