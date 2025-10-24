"use strict";
const common_vendor = require("../../common/vendor.js");
require("../index.js");
const utils_cache = require("../../utils/cache.js");
const api_auth = require("../../api/auth.js");
common_vendor.defineStore("user", () => {
  const isLogin = common_vendor.ref(false);
  const userInfo = common_vendor.ref({});
  const initUserState = () => {
    const token = utils_cache.getAccessToken();
    if (token) {
      setUserInfos();
      isLogin.value = true;
    }
  };
  const setUserInfos = async () => {
    userInfo.value = await getApiUserInfo();
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
  const getApiUserInfo = () => {
    return new Promise((resolve) => {
      api_auth.userInfoApi().then(async (res) => {
        if (res.result === null)
          return;
        var d = res.result;
        const userInfos = {
          id: d.id,
          account: d.account,
          realName: d.realName,
          phone: d.phone,
          idCardNum: d.idCardNum,
          email: d.email,
          accountType: d.accountType,
          avatar: d.avatar ?? "/upload/logo.png",
          address: d.address,
          signature: d.signature,
          orgId: d.orgId,
          orgName: d.orgName,
          posName: d.posName,
          roles: d.roleIds,
          authBtnList: d.buttons,
          tenantId: d.tenantId,
          currentTenantId: d.currentTenantId,
          worktop: d.worktop,
          time: (/* @__PURE__ */ new Date()).getTime()
        };
        resolve(userInfos);
      });
    });
  };
  return {
    isLogin,
    userInfo,
    initUserState,
    setUserInfos,
    clearUserInfo,
    checkLoginStatus,
    getUserInfo
  };
});
//# sourceMappingURL=../../../.sourcemap/mp-weixin/store/modules/user.js.map
