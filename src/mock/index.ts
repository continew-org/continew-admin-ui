import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

import area from './area'
import demo from './demo'

export function setupProdMockServer() {
  createProdMockServer([...area, ...demo])
}
