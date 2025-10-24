"use strict";
const common_vendor = require("../common/vendor.js");
const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const postfix = "_cashapp";
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
function getAccessToken() {
  return get(ACCESS_TOKEN_KEY) || "";
}
function clearToken() {
  remove(ACCESS_TOKEN_KEY);
  remove(REFRESH_TOKEN_KEY);
}
exports.clearToken = clearToken;
exports.getAccessToken = getAccessToken;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/cache.js.map
