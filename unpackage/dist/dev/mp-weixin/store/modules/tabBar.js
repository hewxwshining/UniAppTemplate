"use strict";
const common_vendor = require("../../common/vendor.js");
require("../index.js");
const driverSideTabBarItem = [
  {
    "visible": true,
    "pagePath": "pages/driverSide/index/index",
    "text": "主页",
    "iconPath": "/static/images/tabBar/home.png",
    "selectedIconPath": "/static/images/tabBar/home-hover.png"
  },
  {
    "visible": true,
    "pagePath": "pages/driverSide/order/order",
    "text": "订单",
    "iconPath": "/static/images/tabBar/order.png",
    "selectedIconPath": "/static/images/tabBar/order-hover.png"
  },
  {
    "visible": true,
    "pagePath": "pages/my/my",
    "text": "我的",
    "iconPath": "/static/images/tabBar/my.png",
    "selectedIconPath": "/static/images/tabBar/my-hover.png"
  }
];
const useTabBarStore = common_vendor.defineStore("tabBar", () => {
  const tabBarList = common_vendor.ref(driverSideTabBarItem);
  const tabBarPagePath = common_vendor.ref();
  const setTabBarList = (arr) => {
    tabBarList.value = arr || driverSideTabBarItem;
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
exports.useTabBarStore = useTabBarStore;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/store/modules/tabBar.js.map
