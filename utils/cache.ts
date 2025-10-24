/**
 * 缓存数据优化
 * import cache from '@/utils/cache'
 * 使用方法 【
 *     一、设置缓存
 *         string    cache.put('k', 'string你好啊');
 *         json      cache.put('k', { "b": "3" }, 2);
 *         array     cache.put('k', [1, 2, 3]);
 *         boolean   cache.put('k', true);
 *     二、读取缓存
 *         默认值    cache.get('k')
 *         string    cache.get('k', '你好')
 *         json      cache.get('k', { "a": "1" })
 *     三、移除/清理
 *         移除: cache.remove('k');
 *         清理：cache.clear();
 * 】
 */
// 访问 token 缓存的 key
const ACCESS_TOKEN_KEY = "access_token";
// 刷新 token 缓存的 key
const REFRESH_TOKEN_KEY = "refresh_token";

const postfix : string = '_carassit'; // 缓存后缀
/**
 * 设置缓存
 * @param k 键名
 * @param v 键值
 * @param t 时间、单位秒
 */
export function put(k : string, v : any, t = 0) {
	uni.setStorageSync(k, v)
	let seconds = parseInt(t.toString());
	if (seconds > 0) {
		let timestamp = Date.parse(new Date().toString());
		timestamp = timestamp / 1000 + seconds;
		uni.setStorageSync(k + postfix, timestamp + "")
	} else {
		uni.removeStorageSync(k + postfix)
	}
}

/**
 * 获取缓存
 * @param k 键名
 * @param def 获取为空时默认
 */
export function get(k : string, def : any = 0) {
	let deadtime = parseInt(uni.getStorageSync(k + postfix))
	if (deadtime) {
		if (parseInt(deadtime.toString()) < Date.parse(new Date().toString()) / 1000) {
			if (def) {
				return def;
			} else {
				return false;
			}
		}
	}
	let res = uni.getStorageSync(k);
	if (res) {
		return res;
	} else {
		if (def === undefined || def === "") {
			def = false;
		}
		return def;
	}
}

function remove(k : string) {
	uni.removeStorageSync(k);
	uni.removeStorageSync(k + postfix);
}

function clear() {
	uni.clearStorageSync()
}

/**
 * 获取访问 token
 * @returns 访问 token
 */
export function getAccessToken() : string {
	return get(ACCESS_TOKEN_KEY) || "";
}
/**
 * 设置访问 token
 * @param token 访问 token
 */
export function setAccessToken(token : string) {
	put(ACCESS_TOKEN_KEY, token);
}


/**
 * 获取刷新 token
 * @returns 刷新 token
 */
export function getRefreshToken() : string {
	return get(REFRESH_TOKEN_KEY) || "";
}
/**
 * 设置刷新 token
 * @param token 刷新 token
 */
export function setRefreshToken(token : string) {
	put(REFRESH_TOKEN_KEY, token);
}

/**
 * 清除 token、清除刷新 token
 */
export function clearToken() {
	remove(ACCESS_TOKEN_KEY);
	remove(REFRESH_TOKEN_KEY);
}

export default {
	put,
	get,
	remove,
	clear,
	getAccessToken,
	setAccessToken,
	getRefreshToken,
	setRefreshToken,
	clearToken
}