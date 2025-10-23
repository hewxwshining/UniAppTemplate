import { defineStore } from 'pinia'
import { ref } from 'vue'
import store from "@/store";
import { clearToken, getAccessToken } from '@/utils/cache'
import { userInfoApi } from '@/api/auth';

// 用户信息接口
interface UserInfo {
	id ?: string
	username ?: string
	nickname ?: string
	avatar ?: string
	phone ?: string
	email ?: string
	role ?: string
	permissions ?: string[]
	[key : string] : any
}

export const useUserStore = defineStore('user', () => {
	// 登录状态
	const isLogin = ref(false)
	// 用户信息
	const userInfo = ref<UserInfo>({})

	// 初始化用户状态
	const initUserState = () => {
		const token = getAccessToken()
		if (token) {
			setUserInfos()
			isLogin.value = true
		}
	}

	// 设置用户信息
	const setUserInfos = async () => {
		userInfo.value = await getApiUserInfo()
	}

	// 清除用户信息
	const clearUserInfo = () => {
		userInfo.value = {}
		isLogin.value = false
		clearToken()
	}

	// 检查登录状态
	const checkLoginStatus = () : boolean => {
		let accessToken = getAccessToken()
		return isLogin.value && !!accessToken
	}
	// 获取用户信息
	const getUserInfo = () : UserInfo => {
		return userInfo.value
	}
	// 获取当前用户信息
	const getApiUserInfo = () => {
		return new Promise((resolve) => {
			userInfoApi()
				.then(async (res : any) => {
					if (res.result === null) return;
					var d = res.result;
					const userInfos = {
						id: d.id,
						account: d.account,
						realName: d.realName,
						phone: d.phone,
						idCardNum: d.idCardNum,
						email: d.email,
						accountType: d.accountType,
						avatar: d.avatar ?? '/upload/logo.png',
						address: d.address,
						signature: d.signature,
						orgId: d.orgId,
						orgName: d.orgName,
						posName: d.posName,
						roles: d.roleIds,
						authBtnList: d.buttons,
						tenantId: d.tenantId,
						currentTenantId: d.currentTenantId,
						worktop: d.worktop,
						time: new Date().getTime(),
					}
					resolve(userInfos);
				});
		});
	}
	return {
		isLogin,
		userInfo,
		initUserState,
		setUserInfos,
		clearUserInfo,
		checkLoginStatus,
		getUserInfo
	}
})

export function useUserStoreHook() {
	return useUserStore(store);
}