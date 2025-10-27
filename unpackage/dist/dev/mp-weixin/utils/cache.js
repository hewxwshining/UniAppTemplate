"use strict";
const common_vendor = require("../common/vendor.js");
const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const postfix = "_carassit";
function put(k, v, t = 0) {
  common_vendor.index.setStorageSync(k, v);
  let seconds = parseInt(t.toString());
  if (seconds > 0) {
    let timestamp = Date.parse((/* @__PURE__ */ new Date()).toString());
    timestamp = timestamp / 1e3 + seconds;
    common_vendor.index.setStorageSync(k + postfix, timestamp + "");
  } else {
    common_vendor.index.removeStorageSync(k + postfix);
  }
}
function get(k, def = 0) {
  let deadtime = parseInt(common_vendor.index.getStorageSync(k + postfix));
  if (deadtime) {
    if (parseInt(deadtime.toString()) < Date.parse((/* @__PURE__ */ new Date()).toString()) / 1e3) {
      if (def) {
        return def;
      } else {
        return false;
      }
    }
  }
  let res = common_vendor.index.getStorageSync(k);
  if (res) {
    return res;
  } else {
    if (def === void 0 || def === "") {
      def = false;
    }
    return def;
  }
}
function remove(k) {
  common_vendor.index.removeStorageSync(k);
  common_vendor.index.removeStorageSync(k + postfix);
}
function clear() {
  common_vendor.index.clearStorageSync();
}
function getAccessToken() {
  return get(ACCESS_TOKEN_KEY) || "";
}
function setAccessToken(token) {
  put(ACCESS_TOKEN_KEY, token);
}
function getRefreshToken() {
  return get(REFRESH_TOKEN_KEY) || "";
}
function setRefreshToken(token) {
  put(REFRESH_TOKEN_KEY, token);
}
function clearToken() {
  remove(ACCESS_TOKEN_KEY);
  remove(REFRESH_TOKEN_KEY);
}
const cache = {
  put,
  get,
  remove,
  clear,
  getAccessToken,
  setAccessToken,
  getRefreshToken,
  setRefreshToken,
  clearToken
};
exports.cache = cache;
exports.clearToken = clearToken;
exports.getAccessToken = getAccessToken;
exports.setAccessToken = setAccessToken;
exports.setRefreshToken = setRefreshToken;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/cache.js.map
