"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const store_index = require("./store/index.js");
if (!Math) {
  "./pages/driverSide/index/index.js";
  "./pages/driverSide/order/order.js";
  "./pages/vendorSide/index/index.js";
  "./pages/vendorSide/order/order.js";
  "./pages/login/login.js";
  "./pages/my/my.js";
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "App",
  setup(__props) {
    common_vendor.onLaunch(() => {
      common_vendor.index.__f__("log", "at App.vue:4", "App onLaunch");
      common_vendor.index.reLaunch({
        url: "/pages/login/login"
      });
    });
    common_vendor.onShow(() => {
      common_vendor.index.__f__("log", "at App.vue:11", "App Show");
    });
    common_vendor.onHide(() => {
      common_vendor.index.__f__("log", "at App.vue:14", "App Hide");
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
