"use strict";
const utils_request = require("../utils/request.js");
const userInfoApi = () => {
  let url = "/api/sysAuth/userInfo";
  return utils_request.http.get(url);
};
exports.userInfoApi = userInfoApi;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/auth.js.map
