<template>
	<view class="custom-tabbar-wrapper" :style="tabBarStyle">
		<view class="custom-tabbar" :style="{ height: statusTabBarHeight + 'px' }">
			<view v-for="(item, index) in visibleTabList" :key="index" class="tabbar-item"
				:class="{ active: currentPagePath === item.pagePath }" @click="handleTabClick(item, index)">
				<image :src="
            currentPagePath === item.pagePath
              ? item.selectedIconPath
              : item.iconPath
          " class="tabbar-icon" mode="aspectFit" />
				<text class="tabbar-text" :style="{
            color: currentPagePath === item.pagePath ? selectedColor : color,
          }">
					{{ item.text }}
				</text>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { onLoad, onReady, onShow, onHide } from "@dcloudio/uni-app";
	import { ref, computed, onMounted } from "vue";
	import { CustomTabbarProps } from "./CustomTabbar";
	import { useTabBarStore } from "@/store";
	import { TabBarItem } from "@/store/modules/tabBar";

	const props = withDefaults(defineProps<CustomTabbarProps>(), {
		show: true,
		color: "#a0a0a0",
		selectedColor: "#428ac6",
		backgroundColor: "#fff",
	});

	const tabBarStyle = computed(() => {
		const style = {
			height: statusSaveHeight.value + statusTabBarHeight.value + "px",
			paddingBottom: statusSaveHeight.value + "px",
		};
		return style;
	});

	const statusSaveHeight = ref(0);
	const statusTabBarHeight = ref(60);

	const tabBarStore = useTabBarStore();

	const visibleTabList = computed(() => {
		return tabBarStore.tabBarList
	})


	// 获取当前页面路径
	const getCurrentPagePath = () => {
		const pages = getCurrentPages();
		const currentPage = pages[pages.length - 1];
		return currentPage ? currentPage.route : "";
	};

	// 使用计算属性获取当前页面路径并判断高亮状态
	const currentPagePath = computed(() => {
		return getCurrentPagePath();
	});

	// 处理 tab 点击
	const handleTabClick = (item : TabBarItem) => {
		if (currentPagePath.value === item.pagePath) return;
		uni.switchTab({
			url: `/${item.pagePath}`,
			success: () => {
				tabBarStore.setTabBarPagePath(item.pagePath);
			},
		});
	};

	// 获取 TabBar 总高度（包括安全区域）
	const setTabSaveHeight = () => {
		// #ifdef MP-WEIXIN
		const {
			safeArea,
			screenHeight,
			safeAreaInsets
		} = uni.getWindowInfo()
		// #endif
		// #ifndef MP-WEIXIN
		const {
			safeArea,
			screenHeight,
			safeAreaInsets
		} = uni.getSystemInfoSync()
		// #endif
		// TODO fix by mehaotian 是否适配底部安全区 ,目前微信ios 、和 app ios 计算有差异，需要框架修复
		if (safeArea) {
			// #ifdef MP-WEIXIN
			statusSaveHeight.value = screenHeight - safeArea.bottom
			// #endif
			// #ifndef MP-WEIXIN
			statusSaveHeight.value = safeAreaInsets.bottom
			// #endif
		} else {
			statusSaveHeight.value = 0
		}
	};

	// 获取 TabBar 内容区高度（不包括安全区域）
	const getTabBarHeight = () => {
		return statusSaveHeight.value + statusTabBarHeight.value; // 固定 60px
	};

	// 暴露方法给父组件
	defineExpose({
		getTabBarHeight,
	});

	onLoad(() => {
		setTabSaveHeight();
	});
</script>

<style lang="scss" scoped>
	.custom-tabbar-wrapper {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #D1EAFF;
		// 小程序会有安全距离
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);

		// 添加兼容性处理
		@supports not (padding-bottom: env(safe-area-inset-bottom)) {
			padding-bottom: constant(safe-area-inset-bottom);
		}

		.custom-tabbar {
			height: 60px;
			display: flex;
			justify-content: space-around;
			align-items: center;

			.tabbar-item {
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				height: 100%;

				&.active {
					.tabbar-icon {
						transform: scale(1.1);
					}
				}

				.tabbar-icon {
					width: 40rpx;
					height: 40rpx;
					margin-bottom: 4rpx;
					transition: transform 0.2s;
				}

				.tabbar-text {
					font-size: 20rpx;
				}
			}
		}
	}
</style>