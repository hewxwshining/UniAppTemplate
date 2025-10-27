"use strict";
require("../common/vendor.js");
const utils_request = require("../utils/request.js");
const awaitWrap = async (promise) => {
  try {
    const data = await promise;
    return [null, data];
  } catch (err) {
    return [err, null];
  }
};
const loginApi = (data) => {
  let url = "/WxCarApp/WxOpenLogin";
  return awaitWrap(utils_request.http.post(url, data, { loading: true }));
};
const userInfoApi = () => {
  let url = "/WxCarApp/GetUser";
  return awaitWrap(utils_request.http.post(url));
};
const wxLoginFreeApi = (data) => {
  let url = "/WxCarApp/WxOpenUser";
  return awaitWrap(utils_request.http.post(url, data));
};
const getWxOpenId = (data) => {
  let url = "/WxCarApp/GetWxOpenId";
  return awaitWrap(utils_request.http.post(url, data));
};
exports.getWxOpenId = getWxOpenId;
exports.loginApi = loginApi;
exports.userInfoApi = userInfoApi;
exports.wxLoginFreeApi = wxLoginFreeApi;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/auth.js.map
