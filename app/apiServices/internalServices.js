const FormData = require("form-data");
let { InternalAPIs } = require("../configs");
let { Rest } = require("../restCalls");
const getUserByCond = async (data) => {
  let apiConfig = JSON.parse(JSON.stringify(InternalAPIs.getUserByCond));
  apiConfig.url = process.env.AUTH + process.env.GET_USER_BY_COND;
  apiConfig.data = data;
  return await Rest.callApi(apiConfig);
};
module.exports = {
  getUserByCond,
};
