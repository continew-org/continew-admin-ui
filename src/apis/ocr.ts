/**
 * OCR API
 */
import http from '@/utils/http'

/** OCR 请求参数 */
export interface OcrRequest {
  /** 文件（Base64 编码或 URL） */
  file: string
  /** 文件类型（0=PDF，1=图片） */
  fileType?: number
  /** 是否使用文档方向分类 */
  useDocOrientationClassify?: boolean | null
  /** 是否使用文档矫正 */
  useDocUnwarping?: boolean | null
  /** 是否使用文本行方向分类 */
  useTextlineOrientation?: boolean | null
  /** 文本检测限制边长 */
  textDetLimitSideLen?: number | null
  /** 文本检测限制类型（min/max） */
  textDetLimitType?: string | null
  /** 文本检测阈值 */
  textDetThresh?: number | null
  /** 文本检测框阈值 */
  textDetBoxThresh?: number | null
  /** 文本检测扩张系数 */
  textDetUnclipRatio?: number | null
  /** 文本识别分数阈值 */
  textRecScoreThresh?: number | null
  /** 是否返回可视化结果 */
  visualize?: boolean | null
}

/** OCR 检测框 */
export interface OcrBox {
  x1: number
  y1: number
  x2: number
  y2: number
  x3: number
  y3: number
  x4: number
  y4: number
}

/** OCR 文本结果 */
export interface OcrText {
  /** 文本内容 */
  text: string
  /** 置信度 */
  score: number
  /** 检测框坐标（8个点） */
  box?: number[]
  /** 检测框 */
  box_info?: OcrBox
}

/** OCR 页面结果 */
export interface OcrPageResult {
  /** 原始结果数据 */
  prunedResult: {
    /** 检测框坐标数组 */
    dt_polys?: number[][]
    /** 文本内容数组 */
    rec_texts?: string[]
    /** 文本置信度数组 */
    rec_scores?: number[]
    /** 识别框坐标数组 */
    rec_boxes?: number[][]
    /** 识别框坐标数组 */
    rec_polys?: number[][]
  }
  /** OCR 结果图（Base64 编码） */
  ocrImage?: string | null
  /** 文档预处理图像（Base64 编码） */
  docPreprocessingImage?: string | null
  /** 输入图像（Base64 编码） */
  inputImage?: string | null
}

/** OCR 响应结果 */
export interface OcrResponse {
  /** 请求 UUID */
  logId: string
  /** 错误码（0=成功） */
  errorCode: number
  /** 错误信息 */
  errorMsg: string
  /** OCR 结果 */
  result?: {
    /** OCR 结果列表（每个 PDF 页面或单个图片） */
    ocrResults: OcrPageResult[]
    /** 数据信息 */
    dataInfo: any
  }
}

/**
 * 调用 OCR 服务
 * @param data OCR 请求参数
 * @returns OCR 响应结果
 */
export async function ocrInfer(data: OcrRequest): Promise<OcrResponse> {
  const response = await http.post<string>('/api/ocr/infer', data)
  // 后端返回的是 JSON 字符串，需要解析
  return JSON.parse(response.data)
}


