"use strict";
const common_vendor = require("../common/vendor.js");
const utils_base = require("./base.js");
const utils_cache = require("./cache.js");
const getBaseUrl = () => {
  return "https://abc.ycbayy.cn";
};
const request = (options) => {
  return new Promise((resolve, reject) => {
    if (options.loading !== false) {
      common_vendor.index.showLoading({
        title: options.loadingText || "加载中...",
        mask: true
      });
    }
    const token = utils_cache.getAccessToken();
    const header = {
      "content-type": "application/json",
      ...options.header
    };
    if (token) {
      header["Authorization"] = `Bearer ${token}`;
    }
    const baseUrl = getBaseUrl();
    common_vendor.index.request({
      url: baseUrl + options.url,
      method: options.method || "GET",
      data: cleanObject(options.data),
      header,
      success: (res) => {
        if (options.loading !== false) {
          common_vendor.index.hideLoading();
        }
        if (res.statusCode === 200) {
          let data = res.data;
          if (data.code === 200) {
            resolve(res.data);
          } else if (data.code === 401) {
            clearAccessAfterLogin();
            utils_base.msg(data.message || "请求失败");
            reject(new Error("登录已过期，请重新登录"));
          } else {
            utils_base.msg(data.message || "请求失败");
            reject(new Error(res.data.message || "请求失败"));
          }
        } else {
          reject(new Error(res.data.message || "请求失败"));
        }
        return res;
      },
      fail: (err) => {
        if (options.loading != false) {
          common_vendor.index.hideLoading();
        }
        reject(new Error(err.errMsg || "网络请求失败"));
      }
    });
  });
};
const http = {
  get: (url, data, options) => {
    return request({
      url,
      method: "GET",
      data,
      ...options
    });
  },
  post: (url, data, options) => {
    return request({
      url,
      method: "POST",
      data,
      ...options
    });
  },
  put: (url, data, options) => {
    return request({
      url,
      method: "PUT",
      data,
      ...options
    });
  },
  delete: (url, data, options) => {
    return request({
      url,
      method: "DELETE",
      data,
      ...options
    });
  }
};
const cleanObject = (obj) => {
  if (!obj)
    return obj;
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => {
      if (value === null || value === void 0 || value === "")
        return false;
      if (Array.isArray(value) && value.length === 0)
        return false;
      if (typeof value === "object" && Object.keys(value).length === 0)
        return false;
      return true;
    })
  );
};
const clearAccessAfterLogin = () => {
  utils_cache.clearToken();
  common_vendor.index.navigateTo({
    url: "/pages/auth/login/login"
  });
};
exports.http = http;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/request.js.map
