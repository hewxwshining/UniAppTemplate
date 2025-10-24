"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
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
    const handleLogin = async () => {
      if (!canLogin.value)
        return;
      try {
        await new Promise((resolve) => setTimeout(resolve, 1e3));
        common_vendor.index.showToast({
          title: "登录成功",
          icon: "success"
        });
        setTimeout(() => {
          common_vendor.index.reLaunch({
            url: "/pages/index/index"
          });
        }, 1500);
      } catch (error) {
        common_vendor.index.showToast({
          title: "登录失败，请检查验证码",
          icon: "none"
        });
      }
    };
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
          ["show-tab-bar"]: false
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map
