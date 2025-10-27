"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../index.js");
const utils_cache = require("../../utils/cache.js");
const api_auth = require("../../api/auth.js");
const api_const = require("../../api/const.js");
const utils_base = require("../../utils/base.js");
const store_modules_tabBar = require("./tabBar.js");
const useUserStore = common_vendor.defineStore("user", () => {
  const isLogin = common_vendor.ref(false);
  const userInfo = common_vendor.ref({});
  const initUserState = () => {
    const token = utils_cache.getAccessToken();
    if (token) {
      setUserInfos();
      const openid = utils_cache.cache.get(api_const.CACHEKEY_OPENID, "");
      if (openid == "") {
        common_vendor.index.login({
          success: async (resLogin) => {
            if (resLogin.errMsg == "login:ok") {
              const [err, res] = await api_auth.getWxOpenId({ AppId: api_const.APPID, Code: resLogin == null ? void 0 : resLogin.code });
              if (res) {
                if (res.code === 100) {
                  const data = res.data;
                  cacheopenid(data.openid);
                }
              }
            } else {
              utils_base.msg("授权失败");
              redirectToLogin();
            }
          }
        });
      }
    } else {
      loginWithWechat();
    }
  };
  const setUserInfos = async () => {
    let data = await getApiUserInfo();
    common_vendor.index.__f__("log", "at store/modules/user.ts:68", "setUserInfos", data);
    if (data) {
      isLogin.value = true;
      userInfo.value = data;
      store_modules_tabBar.useTabBarStoreHook().setTabBarList(data == null ? void 0 : data.UserType);
    } else {
      loginWithWechat();
    }
  };
  const clearUserInfo = () => {
    userInfo.value = {};
    isLogin.value = false;
    utils_cache.clearToken();
  };
  const checkLoginStatus = () => {
    let accessToken = utils_cache.getAccessToken();
    return isLogin.value && !!accessToken;
  };
  const getUserInfo = () => {
    return userInfo.value;
  };
  const getApiUserInfo = async () => {
    const [err, res] = await api_auth.userInfoApi();
    if (err)
      return;
    if (res) {
      let d = res.data.User;
      const userInfos = {
        UserId: d.UserId,
        UserType: d.UserType,
        UserName: d.UserName,
        PerId: d.PerId,
        PerCn: d.PerCn,
        PerName: d.PerName,
        PerPhotoPath: d.PerPhotoPath,
        OrgId: d.OrgId,
        BaseId: d.BaseId,
        FirmInfoId: d.FirmInfoId,
        FirmName: d.FirmName,
        Cars: d.Cars
      };
      return userInfos;
    }
  };
  const refreshUserInfo = async () => {
    if (!checkLoginStatus()) {
      common_vendor.index.__f__("log", "at store/modules/user.ts:125", "用户未登录或者未初始化");
      return false;
    }
    setUserInfos();
  };
  const redirectToLogin = (redirectUrl) => {
    var _a;
    isLogin.value = false;
    userInfo.value = {};
    const currentPath = ((_a = getCurrentPages().pop()) == null ? void 0 : _a.route) || "";
    const targetPath = redirectUrl || `/${currentPath}`;
    const pathUrl = targetPath !== "/pages/login/login" ? targetPath : "";
    common_vendor.index.navigateTo({
      url: `/pages/login/login?redirect=${encodeURIComponent(pathUrl)}`
    });
  };
  const userLogout = () => {
    isLogin.value = false;
    utils_cache.clearToken();
    redirectToLogin();
  };
  const loginWithPassword = async (username, password, wxAppId, wxOpenid) => {
    const [error, result] = await api_auth.loginApi({
      UserName: username,
      PassWord: password,
      WxAppId: wxAppId,
      WxOpenid: wxOpenid
    });
    if (error) {
      return false;
    }
    const { access_token, refresh_token, expires_in, token_type } = result == null ? void 0 : result.data;
    utils_cache.setAccessToken(access_token);
    utils_cache.setRefreshToken(refresh_token);
    return true;
  };
  const loginWithWechat = async () => {
    common_vendor.index.login({
      success: async (resLogin) => {
        if (resLogin.errMsg == "login:ok") {
          const [err, res] = await api_auth.wxLoginFreeApi({ AppId: api_const.APPID, Code: resLogin == null ? void 0 : resLogin.code });
          if (err) {
            redirectToLogin();
          }
          if (res) {
            if (res.code === 100) {
              const { access_token, refresh_token, expires_in, token_type, openid } = res == null ? void 0 : res.data;
              cacheopenid(openid);
              utils_cache.setAccessToken(access_token);
              utils_cache.setRefreshToken(refresh_token);
              await setUserInfos();
              if (userInfo.value.UserType == api_const.USERTYPE_DRIVER) {
                common_vendor.index.reLaunch({
                  url: "/pages/driverSide/index/index"
                });
              }
              if (userInfo.value.UserType == api_const.USERTYPE_VENDOR) {
                common_vendor.index.reLaunch({
                  url: "/pages/vendorSide/index/index"
                });
              }
            } else if (res.code === 728) {
              const data = res.data;
              cacheopenid(data.openid);
              if (data.openid == "" || data.openid == null) {
                common_vendor.index.showToast({
                  title: "授权超时，请重新进入",
                  icon: "error",
                  duration: 6e3
                });
              } else if (data.AcOpenid == "" || data.AcOpenid == null) {
                common_vendor.index.navigateTo({
                  url: `/pages/gzhauth/gzhauth?openid=${data.openid}&acid=${data.AcId}`
                  //&acopenid=${data.AcOpenid}
                });
              }
            } else if (res.code === 727) {
              utils_base.msg("授权超时，请重新进入", {
                icon: "none",
                duration: 2e3
              });
            }
          }
        } else {
          utils_base.msg("授权失败");
          redirectToLogin();
        }
      }
    });
  };
  const cacheopenid = (openid) => {
    if (!!openid)
      utils_cache.cache.put(api_const.CACHEKEY_OPENID, openid, 60 * 60 * 12);
  };
  return {
    isLogin,
    userInfo,
    initUserState,
    setUserInfos,
    clearUserInfo,
    checkLoginStatus,
    getUserInfo,
    refreshUserInfo,
    userLogout,
    loginWithPassword,
    loginWithWechat
  };
});
function useUserStoreHook() {
  return useUserStore(store_index.pinia);
}
exports.useUserStore = useUserStore;
exports.useUserStoreHook = useUserStoreHook;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/store/modules/user.js.map
