import { Message, Notification } from '@arco-design/web-vue'
/**
 * @description 接收数据流生成 blob，创建链接，下载文件
 * @param {Function} api 导出表格的api方法 (必传)
 * @param {string} tempName 导出的文件名 (必传)
 * @param {object} params 导出的参数 (默认{})
 * @param {boolean} isNotify 是否有导出消息提示 (默认为 true)
 * @param {string} fileType 导出的文件格式 (默认为.xlsx)
 */
interface NavigatorWithMsSaveOrOpenBlob extends Navigator {
  msSaveOrOpenBlob: (blob: Blob, fileName: string) => void
}
export const useDownload = async (api: () => Promise<any>, isNotify = true, tempName = '', fileType = '.xlsx') => {
  try {
    const res = await api()
    if (res.headers['content-disposition']) {
      tempName = decodeURI(res.headers['content-disposition'].split(';')[1].split('=')[1])
    } else {
      tempName = tempName || new Date().getTime() + fileType
    }
    if (isNotify && !res?.code) {
      Notification.warning({
        title: '温馨提示',
        content: '如果数据庞大会导致下载缓慢哦，请您耐心等待！'
      })
    }
    if (res.status !== 200 || res.data == null || !(res.data instanceof Blob)) {
      Message.error('导出失败，请稍后再试！')
      return
    }
    const blob = new Blob([res.data])
    // 兼容 edge 不支持 createObjectURL 方法
    if ('msSaveOrOpenBlob' in (navigator as unknown as NavigatorWithMsSaveOrOpenBlob)) {
      ;(window.navigator as unknown as NavigatorWithMsSaveOrOpenBlob).msSaveOrOpenBlob(blob, tempName + fileType)
    }
    const blobUrl = window.URL.createObjectURL(blob)
    const exportFile = document.createElement('a')
    exportFile.style.display = 'none'
    exportFile.download = tempName
    exportFile.href = blobUrl
    document.body.appendChild(exportFile)
    exportFile.click()
    // 去除下载对 url 的影响
    document.body.removeChild(exportFile)
    window.URL.revokeObjectURL(blobUrl)
  } catch (error) {
    // console.log(error)
  }
}
