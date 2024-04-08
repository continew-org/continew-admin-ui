import Mock from 'mockjs'
import { random } from 'xe-utils'

/** 返回成功数据 */
export const resultSuccess = (data: unknown) => {
  return Mock.mock({
    code: 200,
    data,
    msg: '请求成功',
    success: true
  })
}

/** 返回失败数据 */
export const resultError = (data: unknown, msg: string, code = 500) => {
  return Mock.mock({
    code,
    data,
    msg,
    success: false
  })
}

/** 获取 50-300ms 的随机延时 */
export const getDelayTime = () => {
  return random(50, 300)
}
