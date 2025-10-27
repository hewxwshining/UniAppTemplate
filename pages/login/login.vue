<template>
	<Layout title="登录" :show-nav-bar="false" :show-tab-bar="false">
		<view class="login-content">
			<!-- 登录标题 -->
			<view class="login-title dflex-c">
				<image src="/static/images/login/car.png" mode="aspectFit" style="width: 55px; height: 55px"></image>
				<text class="title-text">车联网</text>
			</view>

			<!-- 登录表单 -->
			<view class="login-form">
				<view class="login-form-content">
					<view class="form-item">
						<view class="input-label">
							账号
							<text class="label-icon">*</text>
						</view>
						<view class="input-wrapper dflex">
							<input v-model="username" placeholder="请输入您的账号" class="input-field" autocomplete="off"
								:data-form-type="'other'" :data-lpignore="'true'" :data-1p-ignore="'true'"
								:data-bwignore="'true'" :data-dashlane-ignore="'true'"
								:data-bitwarden-watching="'false'" />
							<uni-icons v-if="showClearIcon" type="closeempty" color="#808C99" size="48rpx"
								@click="clearIcon"></uni-icons>
						</view>
					</view>

					<view class="form-item">
						<view class="input-label">
							密码
							<text class="label-icon">*</text>
						</view>
						<view class="input-wrapper dflex">
							<input :password="showPassword" v-model="password" class="input-field" placeholder="请输入密码"
								autocomplete="off" :data-form-type="'other'" :data-lpignore="'true'"
								:data-1p-ignore="'true'" :data-bwignore="'true'" :data-dashlane-ignore="'true'"
								:data-bitwarden-watching="'false'" />
							<image
								:src="!showPassword ? '/static/images/login/psw-open.png' : '/static/images/login/psw.png'"
								mode="aspectFill" style="width: 48rpx; height: 48rpx" @click="changePassword"></image>
						</view>
					</view>
				</view>

				<!-- 登录按钮 -->
				<button class="login-btn" :class="{ disabled: !canLogin }" :disabled="!canLogin"
					@click="handleLogin">登录</button>
			</view>
		</view>
	</Layout>
</template>

<script lang="ts" setup>
	import { LoginResponseData } from '@/api/auth';
	import { APPID, CACHEKEY_OPENID, USERTYPE_DRIVER, USERTYPE_VENDOR } from '@/api/const';
	import Layout from '@/components/Layout/Layout.vue';
	import { useUserStore } from '@/store/modules/user';

	import { msg } from '@/utils/base';
	import cache, { setAccessToken } from '@/utils/cache';
	import { onLoad } from '@dcloudio/uni-app';
	import { computed, ref } from 'vue';
	const userStore = useUserStore();
	const username = ref<string>('');
	const password = ref<string>('');
	const showPassword = ref<Boolean>(true);

	const changePassword = () => {
		showPassword.value = !showPassword.value;
	};
	const showClearIcon = computed(() => {
		return !!username.value.length;
	});
	const clearIcon = function () {
		username.value = '';
	};

	const canLogin = computed(() => {
		return username.value && password.value;
	});
	const isLoading = ref(false);
	const handleLogin = async () => {
		if (!canLogin.value) return;
		if (isLoading.value) return;
		isLoading.value = true;
		let wxAppId = '', wxOpenid = ''
		// #ifdef MP-WEIXIN
		wxAppId = APPID
		wxOpenid = cache.get(CACHEKEY_OPENID,'')
		// #endif
		const isSuccess = await userStore.loginWithPassword(username.value, password.value, wxAppId, wxOpenid);
		isLoading.value = false;
		if (isSuccess) {
			loginOk();
		}
	};

	/**
	 * 存储登录token
	 */
	const setLoginToken = (res : LoginResponseData) => {
		const { access_token, refresh_token, expires_in, token_type } = res;
		setAccessToken(access_token);
	};

	/**
	 * 登录跳转
	 */
	const loginOk = async () => {
		msg('登录成功', { icon: 'success' });
		await userStore.setUserInfos();

		if (userStore.userInfo.UserType == USERTYPE_DRIVER) {
			// 登录成功后跳转到首页
			uni.reLaunch({
				url: '/pages/driverSide/index/index'
			});
		}
		if (userStore.userInfo.UserType == USERTYPE_VENDOR) {
			// 登录成功后跳转到首页
			uni.reLaunch({
				url: '/pages/vendorSide/index/index'
			});
		}
	};

	onLoad(() => {

	});
</script>

<style lang="scss" scoped>
	.login-container {
		min-height: 100vh;
		background-color: #f5f5f5;
	}

	.login-content {
		padding: 30rpx 20rpx;
		margin-top: 100rpx;
		/* 为固定导航栏留出空间 */
	}

	.login-title {
		text-align: center;
		margin-bottom: 60rpx;

		.title-text {
			font-size: 48rpx;
			font-weight: 600;
			color: #fff;
			margin-left: 10px;
		}
	}

	.login-form {
		.login-form-content {
			background-color: #d2e5f6;
			border-radius: 8px;
		}

		.form-item {
			display: flex;
			align-items: center;
			padding: 32rpx;

			.input-label {
				font-size: 32rpx;
				color: #000;
				width: 162rpx;

				.label-icon {
					color: #f00;
					margin-left: 10rpx;
				}
			}

			.input-wrapper {
				flex: 1;
				// background-color: #ffffff;
				border-radius: 12rpx;
				padding: 0 24rpx;

				.input-field {
					height: 88rpx;
					font-size: 32rpx;
					color: #333333;
					width: 100%;

					&::placeholder {
						color: #999999;
					}

					.uni-input-input {
						font-size: 32rpx !important;
					}
				}
			}
		}

		.login-btn {
			width: 100%;
			height: 96rpx;
			line-height: 96rpx;
			background-color: #295af5;
			color: #ffffff;
			border: none;
			border-radius: 68rpx;
			font-size: 32rpx;
			font-weight: 600;
			margin-top: 60rpx;

			&.disabled {
				background-color: #5d98fb;
				color: #fff !important;
			}

			&::after {
				border: none;
			}
		}
	}
</style>