/// <reference types="vite/client" />

/** 声明环境变量的类型 */
interface ImportMetaEnv {
  readonly VITE_API_PREFIX: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_BASE: string
  readonly FILE_OPEN_PREVIEW: string
  readonly FILE_VIEW_SERVER_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
