import { createPinia } from 'pinia'


// 创建 Pinia 实例
const pinia = createPinia()

// 导出 Pinia 实例（用于 Vue 3）
export default pinia


// 导出所有 store 模块
export * from './modules/global'
export * from './modules/user'
export * from './modules/tabBar'