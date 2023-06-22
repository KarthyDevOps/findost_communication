const FormData = require("form-data");
let { InternalAPIs } = require("../configs");
let { Rest } = require("../restCalls");
const getUserById = async (data) => {
  let apiConfig = JSON.parse(JSON.stringify(InternalAPIs.getUserById));
  apiConfig.url = process.env.USER_URL + process.env.GET_USER_BY_ID+data._id;
  apiConfig.data = data;
  return await Rest.callApi(apiConfig);
};
const getAPById = async (data) => {
  console.log("data",data)
  let apiConfig = JSON.parse(JSON.stringify(InternalAPIs.getUserById));
  apiConfig.url = process.env.USER_URL + process.env.GET_AP_BY_ID+data._id;
  apiConfig.data = data;
  console.log("apiconfig",apiConfig.data)
  return await Rest.callApi(apiConfig);
};
const getSequenceId = async (data) => {
  let apiConfig = JSON.parse(JSON.stringify(InternalAPIs.getSequenceId));
  apiConfig.url = process.env.USER_URL + process.env.GET_SEQUENCE_ID;
  apiConfig.data = data;
  console.log('apiConfig',apiConfig)
  return await Rest.callApi(apiConfig);
};

module.exports = {
  getUserById,
  getAPById,
  getSequenceId
};
