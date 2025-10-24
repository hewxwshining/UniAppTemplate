"use strict";
const common_vendor = require("../../common/vendor.js");
require("../index.js");
common_vendor.defineStore("global", () => {
  const customNavHeight = common_vendor.ref(44);
  const customTabHeight = common_vendor.ref(60);
  const setCustomNavHeight = (height) => {
    customNavHeight.value = height;
  };
  const setCustomTabHeight = (height) => {
    customTabHeight.value = height;
  };
  return {
    customNavHeight,
    setCustomNavHeight,
    customTabHeight,
    setCustomTabHeight
  };
});
//# sourceMappingURL=../../../.sourcemap/mp-weixin/store/modules/global.js.map
