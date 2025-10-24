"use strict";
const common_vendor = require("../common/vendor.js");
function msg(title, options = {}) {
  const defaultOptions = {
    icon: "none",
    duration: 2e3,
    ...options
  };
  setTimeout(() => {
    common_vendor.index.showToast({
      title,
      ...defaultOptions
    });
  }, 50);
}
exports.msg = msg;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/base.js.map
