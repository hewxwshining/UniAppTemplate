import cache, { getAccessToken } from './cache'
import { useUserStore } from '@/store/modules/user'

/**
 * 权限守卫工具
 * 用于检查用户登录状态和页面访问权限
 */

// 需要登录的页面路径
const AUTH_REQUIRED_PAGES = [
	'/pages/index/index',
	'/pages/my/my'
]

// 不需要登录的页面路径
const AUTH_FREE_PAGES = [
	'/pages/login/login'
]

/**
 * 检查页面是否需要登录
 * @param path 页面路径
 * @returns boolean
 */
export function isAuthRequired(path: string): boolean {
	return AUTH_REQUIRED_PAGES.includes(path)
}

/**
 * 检查页面是否不需要登录
 * @param path 页面路径
 * @returns boolean
 */
export function isAuthFree(path: string): boolean {
	return AUTH_FREE_PAGES.includes(path)
}

/**
 * 检查用户是否已登录
 * @returns boolean
 */
export function isUserLoggedIn(): boolean {
	const userStore = useUserStore()
	return userStore.checkLoginStatus()
}

/**
 * 检查并跳转登录页面
 * @param redirectUrl 登录后跳转的页面
 */
export function redirectToLogin(redirectUrl?: string): void {
	const currentPath = getCurrentPages().pop()?.route || ''
	const targetPath = redirectUrl || `/${currentPath}`
	
	uni.navigateTo({
		url: `/pages/login/login?redirect=${encodeURIComponent(targetPath)}`
	})
}

/**
 * 页面权限检查
 * @param path 页面路径
 * @returns boolean 是否有权限访问
 */
export function checkPagePermission(path: string): boolean {
	
	// 如果页面不需要登录，直接返回 true
	if (isAuthFree(path)) {
		return true
	}
	// 如果页面需要登录，检查用户是否已登录
	if (isAuthRequired(path)) {
		return isUserLoggedIn()
	}
	
	// 其他页面默认允许访问
	return true
}

/**
 * 全局权限检查（在 App.vue 中使用）
 */
export function globalAuthCheck(): void {
	const userStore = useUserStore()
	
	// 初始化用户状态
	userStore.initUserState()
	
	// 检查当前页面权限
	const pages = getCurrentPages()
	if (pages.length > 0) {
		const currentPage = pages[pages.length - 1]
		const currentPath = `/${currentPage.route}`
		
		if (!checkPagePermission(currentPath)) {
			redirectToLogin(currentPath)
		}
	}
}

/**
 * 页面权限守卫（在页面 onLoad 中使用）
 * @param pagePath 页面路径
 */
export function pageAuthGuard(pagePath: string): void {
	if (!checkPagePermission(pagePath)) {
		redirectToLogin(pagePath)
	}
}

export async  function  initBackEndControlRoutes(){
	if (!getAccessToken()) return false;
	const userStore = useUserStore()
	await userStore.setUserInfos()
	return false 
}