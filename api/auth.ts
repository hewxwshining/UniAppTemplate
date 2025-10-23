import { http } from "@/utils/request";

// 定义参数接口
interface everyParams {
	[key : string] : any; // 允许任意属性
}

interface loginType{
	account:string,
	code:string,
	codeId:string,
	password:string,
	tenantId?:boolean
}


export const getCaptchaApi = (data ?: everyParams) => {
	let url = "/api/sysAuth/captcha";
	return http.get(url, data);
};
export const loginApi = (data:loginType) =>{
	let url = "/api/sysAuth/login";
	return http.post(url, data);
}

export const userInfoApi = ()=>{
	let url ='/api/sysAuth/userInfo'
	return http.get(url)
}