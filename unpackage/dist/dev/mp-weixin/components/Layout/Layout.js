"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (CustomNavbar + CustomTabBar)();
}
const CustomTabBar = () => "../CustomTabBar/CustomTabBar.js";
const CustomNavbar = () => "../CustomNavbar/CustomNavbar.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "Layout",
  props: {
    title: {
      type: String,
      default: "首页"
    },
    showNavBar: {
      type: Boolean,
      default: true
    },
    showTabBar: {
      type: Boolean,
      default: true
    },
    showSetting: {
      type: Boolean,
      default: false
    },
    showBack: {
      type: Boolean,
      default: false
    }
  },
  setup(__props, { expose: __expose }) {
    const CustomNavbarRef = common_vendor.ref();
    const CustomTabBarRef = common_vendor.ref();
    const props = __props;
    const getCustomNavbarHeight = () => {
      if (CustomNavbarRef.value) {
        return CustomNavbarRef.value.getNavBarHeight();
      }
      return 0;
    };
    const getCustomTabBarHeight = () => {
      if (CustomTabBarRef.value) {
        return CustomTabBarRef.value.getTabBarHeight();
      }
      return 0;
    };
    const getStatusSaveHeight = () => {
      const {
        safeArea,
        screenHeight,
        safeAreaInsets,
        statusBarHeight
      } = common_vendor.index.getWindowInfo();
      let safaTabHeight = 0;
      if (safeArea) {
        safaTabHeight = screenHeight - safeArea.bottom;
      }
      return {
        statusBarHeight: statusBarHeight || 0,
        statusTabHeight: safaTabHeight
      };
    };
    const homeStyles = common_vendor.computed(() => {
      const navbarHeight = getCustomNavbarHeight();
      const tabBarHeight = getCustomTabBarHeight();
      const style = {
        paddingTop: navbarHeight + "px",
        paddingBottom: tabBarHeight + "px"
      };
      if (!props.showTabBar) {
        const { statusTabHeight } = getStatusSaveHeight();
        style.paddingBottom = statusTabHeight + "px";
      }
      if (!props.showNavBar) {
        const { statusBarHeight } = getStatusSaveHeight();
        style.paddingTop = statusBarHeight + "px";
      }
      return style;
    });
    __expose({
      CustomNavbarRef,
      CustomTabBarRef,
      getCustomNavbarHeight,
      getCustomTabBarHeight,
      getStatusSaveHeight
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.showNavBar
      }, __props.showNavBar ? {
        b: common_vendor.sr(CustomNavbarRef, "8973774e-0", {
          "k": "CustomNavbarRef"
        }),
        c: common_vendor.p({
          title: __props.title,
          showSetting: __props.showSetting,
          showBack: __props.showBack
        })
      } : {}, {
        d: __props.showTabBar
      }, __props.showTabBar ? {
        e: common_vendor.sr(CustomTabBarRef, "8973774e-1", {
          "k": "CustomTabBarRef"
        })
      } : {}, {
        f: common_vendor.s(homeStyles.value)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8973774e"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/Layout/Layout.js.map
