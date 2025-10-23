<template>
	<view class="custom-navbar" :style="navbarStyle">
		<!-- 导航栏内容 -->
		<view class="navbar-content" :style="{ height: customNavHeight + 'px' }">
			<!-- 左侧区域 -->
			<view class="navbar-left">
				<view v-if="showBack" class="back-btn" @click="handleBack">
					<uni-icons type="left" size="20" color="#333"></uni-icons>
				</view>
				<slot name="left"></slot>
			</view>

			<!-- 中间标题区域 -->
			<view class="navbar-center">
				<text class="navbar-title" :style="titleStyle">{{ title }}</text>
				<slot name="center"></slot>
			</view>

			<!-- 右侧区域 -->
			<view class="navbar-right">
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>


<script setup lang="ts">
	import { ref, computed, getCurrentInstance } from 'vue'
	import { onLoad, onReady, onShow, onHide } from "@dcloudio/uni-app";
	import { useGlobalStore } from '../../store';
	const globalStore = useGlobalStore()

	const emit = defineEmits(['back']);
	const props = withDefaults(defineProps<{
		title ?: string
		showBack ?: boolean,
		backgroundColor ?: string,
		titleColor ?: string,
		borderColor ?: string,
		customStyle ?: any
	}>(), {
		title: '默认标题',
		showBack: false,
		backgroundColor: '',
		titleColor: '#fff',
		customStyle: {}
	})


	const navbarStyle = computed(() => {
		const style = {
			backgroundColor: props.backgroundColor,
			borderBottom: props.borderColor ? `1px solid ${props.borderColor}` : null,
			paddingTop: statusBarHeight.value + 'px',
			height: (statusBarHeight.value + customNavHeight.value) + 'px',
			...props?.customStyle
		}
		return style
	})
	const titleStyle = computed(() => {
		return {
			color: props.titleColor
		}
	})

	// 是否有 back 事件监听（Vue3 事件监听不在 $attrs，需要从 vnode.props 读取）
	const instance = getCurrentInstance()
	const hasBackListener = computed(() => {
		const vnodeProps = instance?.vnode?.props as Record<string, unknown> | undefined
		return !!(vnodeProps && (vnodeProps.onBack))
	})
	const statusBarHeight = ref(0);
	const customNavHeight = ref(globalStore.customNavHeight) // 自定义导航栏内容区高度(默认值，单位px)
	// 获取状态栏高度
	const getStatusBarHeight = () => {
		const systemInfo = uni.getSystemInfoSync()
		statusBarHeight.value = systemInfo.statusBarHeight || 0
		// #ifdef MP-WEIXIN
		// 在微信小程序中，获取胶囊按钮信息以计算导航栏高度
		const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
		customNavHeight.value = (menuButtonInfo.top - statusBarHeight.value) * 2 + menuButtonInfo.height;
		globalStore.setCustomNavHeight(statusBarHeight.value + customNavHeight.value)
		// #endif
	}

	// 返回按钮点击事件
	const handleBack = () => {
		emit('back')
		// 如果没有监听 back 事件，则执行默认返回逻辑
		if (!hasBackListener.value) {
			uni.navigateBack({
				fail: () => {
					// 如果无法返回，则跳转到首页
					uni.reLaunch({
						url: '/pages/index/index'
					})
				}
			})
		}
	}
	onLoad(() => {
		getStatusBarHeight()
	})
</script>

<style lang="scss" scoped>
	.custom-navbar {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 1000;
		/* 确保导航栏在最前 */
		width: 100%;

		.navbar-content {
			display: flex;
			align-items: center;
			height: 44px;
			padding: 0 15px;
			position: relative;

			.navbar-left {
				display: flex;
				align-items: center;
				min-width: 60px;

				.back-btn {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 32px;
					height: 32px;
					border-radius: 50%;
					transition: background-color 0.3s;

					&:active {
						background-color: rgba(0, 0, 0, 0.1);
					}
				}
			}

			.navbar-center {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				max-width: calc(100% - 120px);

				.navbar-title {
					font-size: 17px;
					font-weight: 600;
					color: #333333;
					text-align: center;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}

			.navbar-right {
				display: flex;
				align-items: center;
				justify-content: flex-end;
				min-width: 60px;
			}
		}
	}

	// 深色主题适配
	@media (prefers-color-scheme: dark) {
		.custom-navbar {
			background-color: #1a1a1a;
			border-bottom-color: #333333;

			.navbar-content {
				.navbar-left {
					.back-btn {
						&:active {
							background-color: rgba(255, 255, 255, 0.1);
						}
					}
				}

				.navbar-center {
					.navbar-title {
						color: #ffffff;
					}
				}
			}
		}
	}
</style>