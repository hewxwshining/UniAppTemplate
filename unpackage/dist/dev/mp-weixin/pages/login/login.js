"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_const = require("../../api/const.js");
const store_modules_user = require("../../store/modules/user.js");
const utils_base = require("../../utils/base.js");
const utils_cache = require("../../utils/cache.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_icons + Layout)();
}
const Layout = () => "../../components/Layout/Layout.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "login",
  setup(__props) {
    const userStore = store_modules_user.useUserStore();
    const username = common_vendor.ref("");
    const password = common_vendor.ref("");
    const showPassword = common_vendor.ref(true);
    const changePassword = () => {
      showPassword.value = !showPassword.value;
    };
    const showClearIcon = common_vendor.computed(() => {
      return !!username.value.length;
    });
    const clearIcon = function() {
      username.value = "";
    };
    const canLogin = common_vendor.computed(() => {
      return username.value && password.value;
    });
    const isLoading = common_vendor.ref(false);
    const handleLogin = async () => {
      if (!canLogin.value)
        return;
      if (isLoading.value)
        return;
      isLoading.value = true;
      let wxAppId = "", wxOpenid = "";
      wxAppId = api_const.APPID;
      wxOpenid = utils_cache.cache.get(api_const.CACHEKEY_OPENID, "");
      const isSuccess = await userStore.loginWithPassword(username.value, password.value, wxAppId, wxOpenid);
      isLoading.value = false;
      if (isSuccess) {
        loginOk();
      }
    };
    const loginOk = async () => {
      utils_base.msg("登录成功", { icon: "success" });
      await userStore.setUserInfos();
      if (userStore.userInfo.UserType == api_const.USERTYPE_DRIVER) {
        common_vendor.index.reLaunch({
          url: "/pages/driverSide/index/index"
        });
      }
      if (userStore.userInfo.UserType == api_const.USERTYPE_VENDOR) {
        common_vendor.index.reLaunch({
          url: "/pages/vendorSide/index/index"
        });
      }
    };
    common_vendor.onLoad(() => {
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0,
        b: username.value,
        c: common_vendor.o(($event) => username.value = $event.detail.value),
        d: showClearIcon.value
      }, showClearIcon.value ? {
        e: common_vendor.o(clearIcon),
        f: common_vendor.p({
          type: "closeempty",
          color: "#808C99",
          size: "48rpx"
        })
      } : {}, {
        g: showPassword.value,
        h: password.value,
        i: common_vendor.o(($event) => password.value = $event.detail.value),
        j: !showPassword.value ? "/static/images/login/psw-open.png" : "/static/images/login/psw.png",
        k: common_vendor.o(changePassword),
        l: !canLogin.value ? 1 : "",
        m: !canLogin.value,
        n: common_vendor.o(handleLogin),
        o: common_vendor.p({
          title: "登录",
          ["show-nav-bar"]: false,
          ["show-tab-bar"]: false
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map
