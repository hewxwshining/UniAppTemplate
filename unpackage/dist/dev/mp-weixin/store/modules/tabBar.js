"use strict";
const api_const = require("../../api/const.js");
const store_index = require("../index.js");
const common_vendor = require("../../common/vendor.js");
const driverSideTabBarItem = [
  {
    visible: true,
    pagePath: "pages/driverSide/index/index",
    text: "主页",
    iconPath: "/static/images/tabBar/home.png",
    selectedIconPath: "/static/images/tabBar/home-hover.png"
  },
  {
    visible: true,
    pagePath: "pages/driverSide/order/order",
    text: "订单",
    iconPath: "/static/images/tabBar/order.png",
    selectedIconPath: "/static/images/tabBar/order-hover.png"
  },
  {
    visible: true,
    pagePath: "pages/driverSide/my/my",
    text: "我的",
    iconPath: "/static/images/tabBar/my.png",
    selectedIconPath: "/static/images/tabBar/my-hover.png"
  }
];
const vendorSideTabBarItem = [
  {
    visible: true,
    pagePath: "pages/vendorSide/index/index",
    text: "主页",
    iconPath: "/static/images/tabBar/home.png",
    selectedIconPath: "/static/images/tabBar/home-hover.png"
  },
  {
    visible: true,
    pagePath: "pages/vendorSide/order/order",
    text: "订单",
    iconPath: "/static/images/tabBar/order.png",
    selectedIconPath: "/static/images/tabBar/order-hover.png"
  },
  {
    visible: true,
    pagePath: "pages/vendorSide/my/my",
    text: "我的",
    iconPath: "/static/images/tabBar/my.png",
    selectedIconPath: "/static/images/tabBar/my-hover.png"
  }
];
const useTabBarStore = common_vendor.defineStore("tabBar", () => {
  const tabBarList = common_vendor.ref(driverSideTabBarItem);
  const tabBarPagePath = common_vendor.ref();
  const setTabBarList = (userType) => {
    if (userType === api_const.USERTYPE_DRIVER) {
      tabBarList.value = driverSideTabBarItem;
    } else {
      tabBarList.value = vendorSideTabBarItem;
    }
  };
  const getTabBarList = () => {
    return tabBarList.value;
  };
  const setTabBarPagePath = (pathPath) => {
    tabBarPagePath.value = pathPath;
  };
  return {
    tabBarList,
    setTabBarList,
    getTabBarList,
    setTabBarPagePath
  };
});
function useTabBarStoreHook() {
  return useTabBarStore(store_index.pinia);
}
exports.useTabBarStore = useTabBarStore;
exports.useTabBarStoreHook = useTabBarStoreHook;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/store/modules/tabBar.js.map
