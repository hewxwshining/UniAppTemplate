import { useUserStoreHook } from '@/store';

/**
 * 路由守卫
 * 在页面跳转前进行权限检查
 */
export class RouteGuard {
	/**
	 * 页面跳转前的权限检查
	 */
	public static beforeRouteEnter(to: string, from?: string): boolean {
		const hasAccess = checkPageAccess(to);
		if (!hasAccess) {
			// 跳转到登录页，并保存当前页面路径
			const redirectUrl = to !== '/pages/login/login' ? to : '';
			uni.redirectTo({
				url: `/pages/login/login?redirect=${encodeURIComponent(redirectUrl)}`
			});
			return false;
		}

		return true;
	}

	/**
	 * 页面加载时的权限检查
	 */
	public static onPageLoad(pagePath: string): boolean {
		return checkPageAccess(pagePath);
	}
}

/**
 * 全局路由守卫
 * 在 App.vue 的 onLaunch 中调用
 */
export function setupGlobalRouteGuard(): void {
	// 监听页面跳转
	uni.addInterceptor('navigateTo', {
		invoke(args) {
			return RouteGuard.beforeRouteEnter(args.url);
		}
	});

	uni.addInterceptor('redirectTo', {
		invoke(args) {
			return RouteGuard.beforeRouteEnter(args.url);
		}
	});

	uni.addInterceptor('switchTab', {
		invoke(args) {
			return RouteGuard.beforeRouteEnter(args.url);
		}
	});
}


/**
 * 判断pagePath是否能直接访问
 * @param {string} pagePath 
 * @return 
 */ 
export function checkPageAccess(pagePath : string) : boolean {
	console.log("pagePath =" , pagePath)
	// 不需要登录的页面
	const freePages = ['/pages/login/login', '/pages/register/register','/pages/gzhauth/gzhauth'];
	let flag = false;
	for (let item of freePages) {
		if (pagePath.includes(item)) {
			flag = true;
		}
	}
	console.log('flag = ', flag);
	// 需要登录的页面
	return !flag ? isUserLoggedIn() : true;
}


export function isUserLoggedIn() : boolean {
	const userStore = useUserStoreHook();
	return userStore.checkLoginStatus();
}