/**
 * 工具函数集合
 */

import { ResData } from "@/api/auth"
import { CODE_NOARG, CODE_NOBINPER, CODE_NODATA } from "@/api/const"

/**
 * 消息提示
 * @param title 提示内容
 * @param options 配置选项
 */
export function msg(title : string, options : any = {}) {
	const defaultOptions = {
		icon: 'none',
		duration: 2000,
		...options
	}
	setTimeout(() => {
		uni.showToast({
			title,
			...defaultOptions
		})
	}, 50)
}

/**
 * 消息提示（传入api返回的code，若满足）
 * @param title 提示内容
 * @param options 配置选项
 */
export function msgByCode(data : ResData, title : string, options : any = {}) {
	let istip = true;
	if (data) {
		if (data.code == CODE_NODATA) {
			if (title == null || title.length == 0) {
				msg('没有数据', options)
				return
			}
		}
		if (data.code == CODE_NOARG) {
			istip = false;//底层已统一提示，这里跳过
		}
		if (data.code == CODE_NOBINPER) {
			istip = false;
		}
	}
	if (istip) {
		const defaultOptions = {
			icon: 'none',
			duration: 2000,
			...options
		}
		setTimeout(() => {
			uni.showToast({
				title,
				...defaultOptions
			})
		}, 50)
	}
}

/**
 * 确认对话框
 * @param content 内容
 * @param title 标题
 * @returns Promise<boolean>
 */
export function confirm(content : string, title : string = '提示') : Promise<boolean> {
	return new Promise((resolve) => {
		uni.showModal({
			title,
			content,
			success: (res) => {
				resolve(res.confirm)
			},
			fail: () => {
				resolve(false)
			}
		})
	})
}

/**
 * 加载提示
 * @param title 提示内容
 */
export function showLoading(title : string = '加载中...') {
	uni.showLoading({
		title,
		mask: true
	})
}

/**
 * 隐藏加载提示
 */
export function hideLoading() {
	uni.hideLoading()
}

/**
 * 获取当前页面路径
 * @returns string
 */
export function getCurrentPagePath() : string {
	const pages = getCurrentPages()
	if (pages.length > 0) {
		const currentPage = pages[pages.length - 1]
		return `/${currentPage.route}`
	}
	return ''
}

/**
 * 格式化时间
 * @param date 日期
 * @param format 格式
 * @returns string
 */
export function formatDate(date : Date | string | number, format : string = 'YYYY-MM-DD HH:mm:ss') : string {
	if (typeof date == 'string') {
		date = date.replace(/-/g, '/')
	}
	const d = new Date(date)
	const year = d.getFullYear()
	const month = String(d.getMonth() + 1).padStart(2, '0')
	const day = String(d.getDate()).padStart(2, '0')
	const hours = String(d.getHours()).padStart(2, '0')
	const minutes = String(d.getMinutes()).padStart(2, '0')
	const seconds = String(d.getSeconds()).padStart(2, '0')

	return format
		.replace('YYYY', String(year))
		.replace('MM', month)
		.replace('DD', day)
		.replace('HH', hours)
		.replace('mm', minutes)
		.replace('ss', seconds)
}

/**
 * 转字符串
 */
interface ShowStatus {
	value ?: number | string;
	text ?: string;
	label ?: string;
	color ?: string;
	status ?: string;
	[key : string] : any; // 添加任意属性支持
}
export const formatter = (
	value : any,
	list : ShowStatus[],
	valueKey : string = "value",
	labelKey : string = "text"
) : string => {
	if (!Array.isArray(list) || list.length === 0) {
		return ""; // 如果列表为空或不是数组，直接返回空字符串
	}
	const item = list.find((item) => item[valueKey] === value);
	return item && item[labelKey] ? String(item[labelKey]) : ""; // 确保返回值为字符串
};


/**
 * 防抖函数
 * @param func 要防抖的函数
 * @param wait 等待时间
 * @returns Function
 */
export function debounce<T extends (...args : any[]) => any>(func : T, wait : number) : (...args : Parameters<T>) => void {
	let timeout : number | null = null

	return function (this : any, ...args : Parameters<T>) {
		if (timeout) {
			clearTimeout(timeout)
		}

		timeout = setTimeout(() => {
			func.apply(this, args)
		}, wait)
	}
}

/**
 * 节流函数
 * @param func 要节流的函数
 * @param wait 等待时间
 * @returns Function
 */
export function throttle<T extends (...args : any[]) => any>(func : T, wait : number) : (...args : Parameters<T>) => void {
	let lastCall = 0

	return function (this : any, ...args : Parameters<T>) {
		const now = Date.now()

		if (now - lastCall >= wait) {
			lastCall = now
			func.apply(this, args)
		}
	}
}