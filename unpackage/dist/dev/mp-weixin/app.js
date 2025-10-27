"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const utils_routeGuard = require("./utils/routeGuard.js");
const store_modules_user = require("./store/modules/user.js");
const utils_cache = require("./utils/cache.js");
const store_index = require("./store/index.js");
if (!Math) {
  "./pages/driverSide/index/index.js";
  "./pages/driverSide/order/order.js";
  "./pages/vendorSide/index/index.js";
  "./pages/vendorSide/order/order.js";
  "./pages/login/login.js";
  "./pages/driverSide/my/my.js";
  "./pages/vendorSide/my/my.js";
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "App",
  setup(__props) {
    const userStore = store_modules_user.useUserStore();
    common_vendor.onLaunch(async () => {
      common_vendor.index.__f__("log", "at App.vue:8", "App onLaunch");
      utils_routeGuard.setupGlobalRouteGuard();
      utils_cache.clearToken();
      userStore.initUserState();
    });
    common_vendor.onShow(() => {
      common_vendor.index.__f__("log", "at App.vue:19", "APP onShow");
      userStore.refreshUserInfo();
    });
    common_vendor.onHide(() => {
      common_vendor.index.__f__("log", "at App.vue:24", "App Hide");
    });
    return () => {
    };
  }
});
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.use(store_index.pinia);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
