const FormData = require("form-data");
let { InternalAPIs } = require("../configs");
let { Rest } = require("../restCalls");
const getUserById = async (data) => {
  let apiConfig = JSON.parse(JSON.stringify(InternalAPIs.getUserById));
  apiConfig.url = process.env.USER_URL + process.env.GET_USER_BY_ID+data._id;
  apiConfig.data = data;
  return await Rest.callApi(apiConfig);
};
module.exports = {
  getUserById,
};
