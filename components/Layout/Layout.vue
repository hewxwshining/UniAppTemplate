<template>
	<view class="layout-container">
		<view class="homeLayout" :style="homeStyles">
			<!-- 使用自定义导航栏组件 -->
			<template v-if="showNavBar">
				<custom-navbar ref="CustomNavbarRef" :title="title" :showSetting="showSetting" :showBack="showBack">
					<template v-slot:left>
						<slot name = 'NavBarLeft'>
						</slot>
					</template>
					<template v-slot:center>
						<slot name = 'NavBarCenter'>
						</slot>
					</template>
					<template v-slot:right>
						<slot name = 'NavBarRight'>
						</slot>
					</template>
				</custom-navbar>
			</template>
			<!-- 内容区域 -->
			<view class="main">
				<slot></slot>
			</view>
			<!-- 使用自定义 TabBar -->
			<template v-if="showTabBar">
				<slot name="CustomTabBar">
					<custom-tab-bar ref="CustomTabBarRef" />
				</slot>
			</template>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import CustomTabBar from "@/components/CustomTabBar/CustomTabBar.vue";
	import CustomNavbar from "@/components/CustomNavbar/CustomNavbar.vue";

	import { computed, ref } from "vue";

	const CustomNavbarRef = ref();
	const CustomTabBarRef = ref();

	const props = defineProps({
		title: {
			type: String,
			default: "首页",
		},
		showNavBar: {
			type: Boolean,
			default: true,
		},
		showTabBar: {
			type: Boolean,
			default: true,
		},
		showSetting: {
			type: Boolean,
			default: false,
		},
		showBack: {
			type: Boolean,
			default: false,
		},
	});

	// 获取 CustomNavbar 高度的方法
	const getCustomNavbarHeight = () => {
		if (CustomNavbarRef.value) {
			return CustomNavbarRef.value.getNavBarHeight();
		}
		return 0;
	};

	// 获取 CustomTabBar 高度的方法
	const getCustomTabBarHeight = () => {
		if (CustomTabBarRef.value) {
			return CustomTabBarRef.value.getTabBarHeight();
		}
		return 0;
	};

	const getStatusSaveHeight = () => {
		// #ifdef MP-WEIXIN
		const {
			safeArea,
			screenHeight,
			safeAreaInsets,
			statusBarHeight
		} = uni.getWindowInfo()
		// #endif
		// #ifndef MP-WEIXIN
		const {
			safeArea,
			screenHeight,
			safeAreaInsets,
			statusBarHeight
		} = uni.getSystemInfoSync()
		// #endif

		let safaTabHeight = 0
		if (safeArea) {
			// #ifdef MP-WEIXIN
			safaTabHeight = screenHeight - safeArea.bottom
			// #endif
			// #ifndef MP-WEIXIN
			safaTabHeight = safeAreaInsets.bottom
			// #endif
		}
		return {
			statusBarHeight: statusBarHeight || 0,
			statusTabHeight: safaTabHeight
		};
	};

	const homeStyles = computed(() => {
		// 获取 CustomNavbar 的实际高度
		const navbarHeight = getCustomNavbarHeight();
		// 获取 CustomTabBar 的实际高度
		const tabBarHeight = getCustomTabBarHeight();

		const style = {
			paddingTop: navbarHeight + "px",
			paddingBottom: tabBarHeight + "px",
		};

		if (!props.showTabBar) {
			const { statusTabHeight } = getStatusSaveHeight();
			style.paddingBottom = statusTabHeight + "px";
		}

		if (!props.showNavBar) {
			const { statusBarHeight } = getStatusSaveHeight();
			style.paddingTop = statusBarHeight + "px";
		}
		return style;
	});

	// 暴露 ref 和高度获取方法给父组件
	defineExpose({
		CustomNavbarRef,
		CustomTabBarRef,
		getCustomNavbarHeight,
		getCustomTabBarHeight,
		getStatusSaveHeight,
	});
</script>

<style lang="scss" scoped>
	@import './bg.scss';

	.layout-container {
		// 小程序会有安全距离
		height: 100vh;
		padding-bottom: constant(safe-area-inset-bottom);

		/* padding-bottom: env(safe-area-inset-bottom); */
		// 添加兼容性处理
		@supports not (padding-bottom: env(safe-area-inset-bottom)) {
			padding-bottom: constant(safe-area-inset-bottom);
		}

		overflow: hidden;

		.homeLayout {
			height: 100%;
			display: flex;

			.main {
				flex: 1;
				overflow: auto;
				padding: 0 20rpx;
				font-size: 28rpx;
				color: #111;
				position: relative;
			}
		}
	}
</style>