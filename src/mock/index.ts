import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

import area from './area'

export function setupProdMockServer() {
  createProdMockServer([...area])
}
