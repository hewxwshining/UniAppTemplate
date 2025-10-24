import { defineStore } from 'pinia';
import { ref } from 'vue';
import store, { useTabBarStoreHook } from '@/store';
import cache, { clearToken, getAccessToken, setAccessToken, setRefreshToken } from '@/utils/cache';
import { getWxOpenId, loginApi, userInfoApi, wxLoginFreeApi } from '@/api/auth';
import { APPID, CACHEKEY_OPENID, USERTYPE_DRIVER, USERTYPE_VENDOR } from '@/api/const';
import { msg } from '@/utils/base';

// 用户信息接口
interface UserInfo {
	UserId ?: string;
	UserType ?: number;
	UserName ?: string;
	PerId ?: string;
	PerCn ?: string;
	PerName ?: string;
	PerPhotoPath ?: string;
	OrgId ?: string;
	BaseId ?: string;
	FirmInfoId ?: string;
	FirmName ?: string;
	Cars ?: any[];
	[key : string] : any;
}

export const useUserStore = defineStore('user', () => {
	// 登录状态
	const isLogin = ref(false);
	// 用户信息
	const userInfo = ref<UserInfo>({});
	// 初始化用户状态
	const initUserState = () => {
		const token = getAccessToken();
		if (token) {
			setUserInfos();
			const openid = cache.get(CACHEKEY_OPENID, '')
			if (openid == '') {
				uni.login({
					success: async (resLogin) => {
						if (resLogin.errMsg == 'login:ok') {
							const [err, res] = await getWxOpenId({ AppId: APPID, Code: resLogin?.code });
							if (res) {
								if (res.code === 100) {
									const data = res.data;
									cacheopenid(data.openid)
								}
							}
						} else {
							msg('授权失败');
							redirectToLogin();
						}
					}
				});
			}
		} else {
			// #ifndef MP-WEIXIN
			redirectToLogin();
			// #endif
			// #ifdef MP-WEIXIN
			loginWithWechat();
			// #endif
		}
	};

	// 设置用户信息
	const setUserInfos = async () => {
		let data = await getApiUserInfo();
		console.log('setUserInfos', data);
		if (data) {
			isLogin.value = true;
			userInfo.value = data as UserInfo;
			// 设置导航栏
			useTabBarStoreHook().setTabBarList(data?.UserType);
		} else {
			// #ifndef MP-WEIXIN
			redirectToLogin();
			// #endif
			// #ifdef MP-WEIXIN
			loginWithWechat();
			// #endif
		}
	};

	// 清除用户信息
	const clearUserInfo = () => {
		userInfo.value = {};
		isLogin.value = false;
		clearToken();
	};

	// 检查登录状态
	const checkLoginStatus = () : boolean => {
		let accessToken = getAccessToken();
		return isLogin.value && !!accessToken;
	};
	// 获取用户信息
	const getUserInfo = () : UserInfo => {
		return userInfo.value;
	};
	// 获取当前用户信息
	const getApiUserInfo = async () => {
		const [err, res] = await userInfoApi();
		if (err) return;
		if (res) {
			let d = res.data.User;
			const userInfos = {
				UserId: d.UserId,
				UserType: d.UserType,
				UserName: d.UserName,
				PerId: d.PerId,
				PerCn: d.PerCn,
				PerName: d.PerName,
				PerPhotoPath: d.PerPhotoPath,
				OrgId: d.OrgId,
				BaseId: d.BaseId,
				FirmInfoId: d.FirmInfoId,
				FirmName: d.FirmName,
				Cars: d.Cars
			};
			return userInfos;
		}
	};
	const refreshUserInfo = async () => {
		if (!checkLoginStatus()) {
			console.log('用户未登录或者未初始化');
			return false;
		}
		setUserInfos();
	};
	// 重定向到登录页面
	const redirectToLogin = (redirectUrl ?: string) => {
		isLogin.value = false;
		userInfo.value = {};
		const currentPath = getCurrentPages().pop()?.route || '';
		const targetPath = redirectUrl || `/${currentPath}`;
		const pathUrl = targetPath !== '/pages/login/login' ? targetPath : '';
		uni.navigateTo({
			url: `/pages/login/login?redirect=${encodeURIComponent(pathUrl)}`
		});
	};

	const userLogout = () => {
		isLogin.value = false;
		clearToken();
		redirectToLogin();
	};
	const loginWithPassword = async (username : string, password : string, wxAppId : string, wxOpenid : string) : Promise<boolean> => {
		const [error, result] = await loginApi({
			UserName: username,
			PassWord: password,
			WxAppId: wxAppId,
			WxOpenid: wxOpenid
		});
		if (error) {
			return false;
		}
		const { access_token, refresh_token, expires_in, token_type } = result?.data;
		// 保存token
		setAccessToken(access_token);
		setRefreshToken(refresh_token);
		return true;
	};
	/**
	 * 微信免密登陆
	 */
	const loginWithWechat = async () => {
		uni.login({
			success: async (resLogin) => {
				if (resLogin.errMsg == 'login:ok') {
					//通过将code传给后端，后端拿到code后向微信服务发起请求，获取需要的 openId 与sessionKey，然后后端可以解密出用户信息，这里将token返回给前端
					const [err, res] = await wxLoginFreeApi({ AppId: APPID, Code: resLogin?.code });
					if (err) {
						redirectToLogin();
					}
					if (res) {
						if (res.code === 100) {
							const { access_token, refresh_token, expires_in, token_type, openid } = res?.data;
							cacheopenid(openid)
							// 保存token
							setAccessToken(access_token);
							setRefreshToken(refresh_token);

							// 获取用户信息
							await setUserInfos();
							
							if (userInfo.value.UserType == USERTYPE_DRIVER) {
								// 登录成功后跳转到首页
								uni.reLaunch({
									url: '/pages/driverSide/index/index'
								});
							}
							if (userInfo.value.UserType == USERTYPE_VENDOR) {
								// 登录成功后跳转到首页
								uni.reLaunch({
									url: '/pages/vendorSide/index/index'
								});
							}
						} else if (res.code === 728) {
							const data = res.data;
							cacheopenid(data.openid)
							if (data.openid == '' || data.openid == null) {
								//授权出错：微信小程序openid为空
								uni.showToast({
									title: '授权超时，请重新进入',
									icon: 'error',
									duration: 6000
								});
							} else if (data.AcOpenid == '' || data.AcOpenid == null) {
								//若提示“无法获取用户身份 登录的微信号未绑定为公众号的网页开发者，无法使用Oauth授权登录获取用户身份”，直接return，不要执行后续的代码逻辑（取消下一行代码的屏蔽）
								//return;
								//微信公众号openid为空，小程序openid授权正常，需要公众号静默授权逻辑
								//redirectToLogin();
								uni.navigateTo({
									url: `/pages/gzhauth/gzhauth?openid=${data.openid}&acid=${data.AcId}` //&acopenid=${data.AcOpenid}
								});
							}
						} else if (res.code === 727) {
							msg('授权超时，请重新进入', {
								icon: 'none',
								duration: 2000
							});
						}
					}
				} else {
					msg('授权失败');
					redirectToLogin();
				}
			}
		});
	};
	
	/**
	 * 12小时缓存小程序openid,考虑到解绑的时间点可能比较大
	 */
	const cacheopenid = (openid) => {
		if (!!openid)
			cache.put(CACHEKEY_OPENID, openid, 60 * 60 * 12)
	}
	
	return {
		isLogin,
		userInfo,
		initUserState,
		setUserInfos,
		clearUserInfo,
		checkLoginStatus,
		getUserInfo,
		refreshUserInfo,
		userLogout,
		loginWithPassword,
		loginWithWechat
	};
});

export function useUserStoreHook() {
	return useUserStore(store);
}