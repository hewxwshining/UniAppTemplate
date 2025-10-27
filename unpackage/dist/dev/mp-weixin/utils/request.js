"use strict";
const common_vendor = require("../common/vendor.js");
const utils_base = require("./base.js");
const utils_cache = require("./cache.js");
const api_const = require("../api/const.js");
const getBaseUrl = () => {
  return "http://183.47.49.202:60040";
};
let isLoading = false;
const request = (options) => {
  return new Promise((resolve, reject) => {
    if (options.loading) {
      isLoading = true;
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
      timeout: 3e4,
      header,
      success: (res) => {
        common_vendor.index.__f__("log", "at utils/request.ts:68", res);
        if (isLoading) {
          common_vendor.index.hideLoading();
          isLoading = false;
        }
        if (res.statusCode === 200) {
          let data = res.data;
          if (data.code === 100) {
            resolve(data);
          } else if (data.code === 401) {
            clearAccessAfterLogin();
            utils_base.msg(data.msg || "登录已过期，请重新登录");
            reject(new Error("登录已过期，请重新登录"));
          } else if (data.code === 510) {
            utils_base.msg(data.msg || "登录失败，用户名或密码错误");
            reject(new Error("登录失败，用户名或密码错误"));
          } else if (data.code === 611) {
            clearAccessAfterLogin();
            utils_base.msg("登录已过期，请重新登录");
            reject(new Error("登录已过期，请重新登录"));
          } else if (data.code === 727 || data.code === 728) {
            resolve(data);
          } else if (data.code === api_const.CODE_NODATA) {
            resolve(data);
          } else if (data.code === api_const.CODE_NOARG) {
            const tipNoArg = "参数错误";
            utils_base.msg(tipNoArg);
            resolve(data);
          } else if (data.code === api_const.CODE_NOBINPER) {
            const tipNoBinPer = "账号未绑定人员";
            utils_base.msg(tipNoBinPer);
            resolve(data);
          } else {
            utils_base.msg(data.msg || "请求失败");
            reject(new Error(res.data.msg || "请求失败"));
          }
        } else {
          let statusCode = res.statusCode;
          const commonErrors = {
            400: "请求参数错误",
            401: "未授权，请重新登录",
            403: "权限不足",
            404: "请求的资源不存在",
            408: "请求超时",
            500: "服务器内部错误",
            502: "网关错误",
            503: "服务暂不可用",
            504: "网关超时"
          };
          const message = commonErrors[statusCode] || `请求失败（状态码：${statusCode}）`;
          utils_base.msg(message);
          reject(new Error(message));
        }
        return res;
      },
      fail: (err) => {
        if (isLoading) {
          isLoading = false;
          common_vendor.index.hideLoading();
        }
        reject(new Error(err.errMsg));
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
    url: "/pages/login/login"
  });
};
exports.http = http;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/request.js.map
