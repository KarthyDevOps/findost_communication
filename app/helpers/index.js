

const json2csv = require("json2csv").parse;
const {google} = require('googleapis')
const sendOTP = (mobileNumber, type = "customer") => {
  if (mobileNumber) {
    return 1234;
  }
  throw new Error("");
};
const errHandle = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const pageMetaService = async (params, count) => {
  try {
    console.log('params,count')
    console.log(params,count)
    return {
      pageCount: Math.ceil(count / params.limit),
      nextPage:
        params.page >= Math.ceil(count / params.limit)
          ? null
          : params?.page + 1,
      pageSize: params?.limit,
      total: count,
      currentPage: Number(params?.page),
    };
  } catch (error) {
    throw Error(error);
  }
};

const formatDataList = async (params) => {
  let finalList = [];
  const list = params?.list?.data?.length ? params.list?.data : [];
  // check list contains data's for category or faq
  if (list && list?.length) {
    if (params.type == "faq") {
      finalList = await faqDataAlignment(list);
    }
    return {
      status: true,
      data: finalList?.data,
    };
  } else {
    return {
      status: false,
      data: [],
    };
  }
};
const faqDataAlignment = async (list) => {
  let json,
    finalList = [];
  list.map((data) => {
    json = {
      ["Faq Id"]: data._id ? data._id.toString() : null,
      ["Question"]: data.question ? data.question : null,
      ["Answer"]: data.answer ? data.answer : null,
      ["Type"]: data.type ? data.type : null,
      ["Created Time"]: data.createdAt ? data.createdAt : null,
      ["Updated Time"]: data.updatedAt ? data.createdAt : null,
      ["Active"]: data.isActive ? data.isActive : null,
    };
    //push the every object into finalList array
    finalList.push(json);
  });
  return {
    status: true,
    data: finalList,
  };
};
const convert_JSON_to_file = async (res, data, params) => {
  let type = params?.type,
    fileType = params?.fileType;
  //export json data into csv file
  const csvString = json2csv(data?.data);
  if (fileType === "csv") {
    if (type == "waitingCharge") {
      res.setHeader(
        "Content-disposition",
        "attachment; filename=Waiting Charge Export.xlsx"
      );
    }
  } else if (fileType === "xlsx") {
    if (type == "waitingCharge") {
      res.setHeader(
        "Content-disposition",
        "attachment; filename=Waiting Charge Export.xlsx"
      );
    }
  }
  res.set("Content-Type", "text/csv");
  res.status(200).send(csvString);
  return res;
};

const oauth2client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
)
oauth2client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN
});


module.exports = {
  sendOTP,
  errHandle,
  pageMetaService,
  formatDataList,
  faqDataAlignment,
  convert_JSON_to_file,
  oauth2client
};
