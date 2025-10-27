<script lang="ts" setup>
	import { onHide, onLaunch, onShow } from '@dcloudio/uni-app';
	import { setupGlobalRouteGuard } from './utils/routeGuard';
	import { useUserStore } from '@/store/modules/user';
	import { clearToken } from './utils/cache';
	const userStore = useUserStore()
	onLaunch(async () => {
		console.log("App onLaunch")
		setupGlobalRouteGuard();
		// 微信小程序默认打开务必是登录页，避免出现已解绑账号使用token自动登录并点击解绑时报错！下面采用清楚token的方式
		// #ifdef MP-WEIXIN
		clearToken()
		// #endif
		// 初始化权限状态
		userStore.initUserState();
	});

	onShow(() => {
		console.log('APP onShow');
		// 每次应用显示时刷新用户信息
		userStore.refreshUserInfo();
	});
	onHide(() => {
		console.log('App Hide');
	});
</script>

<style lang="scss">
	/*每个页面公共css */
	@use '@/static/styles/common.scss';
</style>