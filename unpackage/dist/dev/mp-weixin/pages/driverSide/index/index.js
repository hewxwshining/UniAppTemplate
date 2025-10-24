"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Math) {
  layout();
}
const layout = () => "../../../components/Layout/Layout.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    common_vendor.onLoad(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "首页"
        })
      };
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/driverSide/index/index.js.map
