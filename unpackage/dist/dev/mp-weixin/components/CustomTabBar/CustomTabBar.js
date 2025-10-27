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
  setup(__props, { expose: __expose }) {
    const tabBarStyle = common_vendor.computed(() => {
      const style = {
        height: statusSaveHeight.value + statusTabBarHeight.value + "px",
        paddingBottom: statusSaveHeight.value + "px"
      };
      return style;
    });
    const statusSaveHeight = common_vendor.ref(0);
    const statusTabBarHeight = common_vendor.ref(60);
    const tabBarStore = store_modules_tabBar.useTabBarStore();
    const visibleTabList = common_vendor.computed(() => {
      return tabBarStore.tabBarList;
    });
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
    const setTabSaveHeight = () => {
      const {
        safeArea,
        screenHeight,
        safeAreaInsets
      } = common_vendor.index.getWindowInfo();
      if (safeArea) {
        statusSaveHeight.value = screenHeight - safeArea.bottom;
      } else {
        statusSaveHeight.value = 0;
      }
    };
    const getTabBarHeight = () => {
      return statusSaveHeight.value + statusTabBarHeight.value;
    };
    __expose({
      getTabBarHeight
    });
    common_vendor.onLoad(() => {
      setTabSaveHeight();
    });
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
        }),
        b: statusTabBarHeight.value + "px",
        c: common_vendor.s(tabBarStyle.value)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-208a9ade"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/CustomTabBar/CustomTabBar.js.map
