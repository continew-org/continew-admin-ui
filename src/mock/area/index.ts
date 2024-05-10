import { findTree } from 'xe-utils'
import { defineMock } from '../_base'
import { getDelayTime, resultSuccess } from '../_utils'
import areaData from '../_data/area'

export default defineMock([
  {
    url: '/area/list',
    method: 'get',
    timeout: getDelayTime(),
    response: ({ query }) => {
      const { type, code } = query
      if (type === 'province') {
        const data = areaData.map((i) => ({ label: i.label, code: i.code }))
        return resultSuccess(data)
      }
      if (type === 'city' || type === 'area') {
        const parent = findTree(areaData, (i) => i.code === code)
        const data = parent?.item?.children?.map((i) => ({ label: i.label, code: i.code }))
        return resultSuccess(data)
      }
    }
  }
])
