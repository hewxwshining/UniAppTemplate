"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../store/index.js");
const store_modules_tabBar = require("../../store/modules/tabBar.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "CustomTabBar",
  props: {
    show: { type: Boolean, default: true },
    tabList: {},
    color: { default: "#a0a0a0" },
    selectedColor: { default: "#428ac6" },
    backgroundColor: { default: "#fff" }
  },
  setup(__props) {
    const tabBarStore = store_modules_tabBar.useTabBarStore();
    const visibleTabList = common_vendor.ref(tabBarStore.tabBarList);
    const getCurrentPagePath = () => {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      return currentPage ? currentPage.route : "";
    };
    const currentPagePath = common_vendor.computed(() => {
      return getCurrentPagePath();
    });
    const handleTabClick = (item) => {
      if (currentPagePath.value === item.pagePath)
        return;
      common_vendor.index.switchTab({
        url: `/${item.pagePath}`,
        success: () => {
          tabBarStore.setTabBarPagePath(item.pagePath);
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(visibleTabList.value, (item, index, i0) => {
          return {
            a: currentPagePath.value === item.pagePath ? item.selectedIconPath : item.iconPath,
            b: common_vendor.t(item.text),
            c: currentPagePath.value === item.pagePath ? _ctx.selectedColor : _ctx.color,
            d: index,
            e: currentPagePath.value === item.pagePath ? 1 : "",
            f: common_vendor.o(($event) => handleTabClick(item), index)
          };
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-208a9ade"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/CustomTabBar/CustomTabBar.js.map
