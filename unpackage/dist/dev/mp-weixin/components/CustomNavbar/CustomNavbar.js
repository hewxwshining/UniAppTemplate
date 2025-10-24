"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "CustomNavbar",
  props: {
    title: { default: "默认标题" },
    showBack: { type: Boolean, default: false },
    backgroundColor: { default: "" },
    titleColor: { default: "#fff" },
    borderColor: {},
    customStyle: { default: {} }
  },
  emits: ["back"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const navbarStyle = common_vendor.computed(() => {
      const style = {
        backgroundColor: props.backgroundColor,
        borderBottom: props.borderColor ? `1px solid ${props.borderColor}` : null,
        paddingTop: curStatusBarHeight.value + "px",
        height: curStatusBarHeight.value + statusNavHeight.value + "px",
        ...props == null ? void 0 : props.customStyle
      };
      return style;
    });
    const titleStyle = common_vendor.computed(() => {
      return {
        color: props.titleColor
      };
    });
    const instance = common_vendor.getCurrentInstance();
    const hasBackListener = common_vendor.computed(() => {
      var _a;
      const vnodeProps = (_a = instance == null ? void 0 : instance.vnode) == null ? void 0 : _a.props;
      return !!(vnodeProps && vnodeProps.onBack);
    });
    const curStatusBarHeight = common_vendor.ref(0);
    const statusNavHeight = common_vendor.ref(44);
    const getStatusBarHeight = () => {
      const {
        statusBarHeight
      } = common_vendor.index.getWindowInfo();
      curStatusBarHeight.value = statusBarHeight || 0;
      const menuButtonInfo = common_vendor.index.getMenuButtonBoundingClientRect();
      statusNavHeight.value = (menuButtonInfo.top - curStatusBarHeight.value) * 2 + menuButtonInfo.height;
    };
    const handleBack = () => {
      emit("back");
      if (!hasBackListener.value) {
        common_vendor.index.navigateBack({
          fail: () => {
            common_vendor.index.reLaunch({
              url: "/pages/index/index"
            });
          }
        });
      }
    };
    const getNavBarHeight = () => {
      return curStatusBarHeight.value + statusNavHeight.value;
    };
    __expose({
      getNavBarHeight
    });
    common_vendor.onLoad(() => {
      getStatusBarHeight();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.showBack
      }, _ctx.showBack ? {
        b: common_vendor.p({
          type: "left",
          size: "24",
          color: "#fff"
        }),
        c: common_vendor.o(handleBack)
      } : {}, {
        d: common_vendor.t(_ctx.title),
        e: common_vendor.s(titleStyle.value),
        f: statusNavHeight.value + "px",
        g: common_vendor.s(navbarStyle.value)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ff1d8d81"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/CustomNavbar/CustomNavbar.js.map
