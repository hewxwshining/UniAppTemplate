import cache from '@/utils/cache';
import { getBaseUrl, http } from '@/utils/request';

// 定义参数接口
interface everyParams {
  [key: string]: any; // 允许任意属性
}


/**
 * 定义响应数据接口(用于一些传入一些方法中，但每个字段不是必须的)
 */
export interface ResData<T = any> {
	code?: number;
	data?: T;
	msg?: string;
}

export interface loginType {
  UserName: string;
  PassWord: string;
  WxAppId:string;
  WxOpenid:string;
}

// 登录响应数据类型定义
export interface LoginResponseData {
  access_token: string;
  expires_in: number;
  token_type: string;
  refresh_token: string;
  scope: string;
}

// 用户信息类型定义
export interface UserInfo {
  UserId: string;
  UserType: string;
  UserName: string;
  PerId: string;
  PerCn: string;
  PerName: string;
  PerPhotoPath: string;
  OrgId: string;
  BaseId: string;
  FirmInfoId?: string;
  FirmName?: string;
  Cars?: any[];
  [key: string]: any;
}

// 用户信息API响应类型
export interface UserInfoResponse {
  User: UserInfo;
  [key: string]: any;
}

const awaitWrap = async <T>(promise: Promise<T>): Promise<[any, T | null]> => {
  try {
    const data = await promise;
    return [null, data];
  } catch (err) {
    return [err, null];
  }
};

export const getCaptchaApi = (data?: everyParams) => {
  let url = '/api/timeout/640';
  return awaitWrap(http.get(url, data, { loading: true }));
};

export const loginApi = (data: loginType) => {
  let url = '/WxCarApp/WxOpenLogin';
  return awaitWrap(http.post(url, data, { loading: true }));
};

export const userInfoApi = () => {
  let url = '/WxCarApp/GetUser';
  return awaitWrap(http.post(url));
};

/**
 * 微信免登录
 */
export const wxLoginFreeApi = (data: everyParams) => {
  let url = '/WxCarApp/WxOpenUser';
  return awaitWrap(http.post(url, data));
};

/**
 * 获取微信openid
 */
export const getWxOpenId = (data: everyParams) => {
  let url = '/WxCarApp/GetWxOpenId';
  return awaitWrap(http.post(url, data));
};

/**
 * 获取字典配置
 * @param data 格式{Flag:DictFlagEnum.CarRepairType}
 */
export const getDictDocApi = (data ?: everyParams) => {
	let url = "/WxCarApp/GetDictDoc";
	return http.post(url, data);
}


/*
*上传逻辑（带进度提示）
*/
export const uploadMyFile = async (file : any) => {
	console.log(file)
	uni.showLoading({ title: '上传中...', mask: true });
	try {
		const res = await uni.uploadFile({
			url: getBaseUrl() + "/WxCarApp/UploadImage",
			filePath: file,
			name: 'file',
			formData: {
				folderName: 'WxCar'
			},
			header: { 'Authorization': `Bearer ${cache.getAccessToken()}` },
			onProgressUpdate: (e : any) => {
				console.log(e)
				console.log(`进度：${e.progress}%`);
			}
		});

		if (res.statusCode !== 200) throw new Error('上传失败');
		const data = JSON.parse(res.data);
		return data;
	} finally {
		uni.hideLoading();
	}
};

/**
 * 删除临时区的文件
 */
export const delTmpFile = (data ?: everyParams) => {
	let url = "/WxCarApp/DeleteUpFile";
	return http.post(url, data);
}

/**
 * 解绑微信和账号 {WxAppId:'',WxOpenid:''}
 */
export const wxUserUnbind = (data ?: everyParams) => {
	let url = "/WxCarApp/WxUserUnbind";
	return http.post(url, data);
}

