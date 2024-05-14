export interface FileTypeListItem {
  name: string
  value: number
  icon: string
}

/** 文件分类 */
export const FileTypeList: FileTypeListItem[] = [
  { name: '全部', value: 0, icon: 'menu-file' },
  { name: '图片', value: 2, icon: 'file-image-color' },
  { name: '文档', value: 3, icon: 'file-txt' },
  { name: '视频', value: 4, icon: 'file-video-color' },
  { name: '音频', value: 5, icon: 'file-music' },
  { name: '其他', value: 1, icon: 'file-other' }
]

export interface FileExtendNameIconMap {
  [key: string]: string
}

/** 文件类型图标 Map 映射 */
export const FileIcon: FileExtendNameIconMap = {
  mp3: 'file-music',
  mp4: 'file-video',
  dir: 'file-dir',
  ppt: 'file-ppt',
  doc: 'file-wps',
  docx: 'file-wps',
  xls: 'file-excel',
  xlsx: 'file-excel',
  txt: 'file-txt',
  rar: 'file-rar',
  zip: 'file-zip',
  html: 'file-html',
  css: 'file-css',
  js: 'file-js',
  other: 'file-other' // 未知文件
}

/** 图片类型 */
export const ImageTypes = ['jpg', 'png', 'gif', 'jpeg']

/** WPS、Office文件类型 */
export const OfficeTypes = ['ppt', 'pptx', 'doc', 'docx', 'xls', 'xlsx']
