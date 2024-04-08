import { viteMockServe } from 'vite-plugin-mock'

export default function createMock(env, isBuild) {
  const { VITE_BUILD_MOCK } = env
  return viteMockServe({
    mockPath: 'src/mock', // 目录位置
    logger: !isBuild, //  是否在控制台显示请求日志
    supportTs: true, // 是否读取 ts 文件模块
    localEnabled: true, // 设置是否启用本地mock文件
    prodEnabled: isBuild && VITE_BUILD_MOCK === 'true', // 设置打包是否启用mock功能
    // 这样可以控制关闭mock的时候不让mock打包到最终代码内
    injectCode: `
          import { setupProdMockServer } from '../src/mock/index';
          setupProdMockServer();
        `
  })
}
