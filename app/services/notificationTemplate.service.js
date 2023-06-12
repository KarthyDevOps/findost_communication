const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const { messages } = require("../response/customMesages");
const { NotificationTemplate } = require("../models/notificationTemplate");

const {
  convert_JSON_to_file,
  formatDataList,
  pageMetaService,
} = require("../helpers/index");

const { getNotificationTemplateList } = require("./list.service");


const createNotificationTemplateService = async (params) => {
  var newvalues = params;
  const resp = await NotificationTemplate.create(newvalues);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.created,
    data: {
      _id: resp?._id,
    },
  };
};

const getNotificationTemplateService = async (params) => {
  var payload = {
    _id: params?.notificationTemplateId,
    isDeleted: false,
  };
  const resp = await NotificationTemplate.findOne(payload);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: resp,
  };
};

const updateNotificationTemplateService = async (params) => {
  var payload = {
    _id: params?.notificationTemplateId,
    isDeleted: false
  };
  delete params["notificationTemplateId"];
  var newvalues = {
    $set: params,
  };
  const resp = await NotificationTemplate.updateOne(payload, newvalues);
  if (!resp.modifiedCount) {
    return {
      status: false,
      statusCode: statusCodes?.HTTP_UNPROCESSABLE_ENTITY,
      message: messages?.somethingWrong,
      data: [],
    };
  }
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.updated,
    data: [],
  };
};

const notificationTemplateListService = async (params) => {
  params.all = true;
  const allList = await getNotificationTemplateList(params);
  params.all = params.returnAll ==true ? true : false;

  const result = await getNotificationTemplateList(params);
  const pageMeta = await pageMetaService(params, allList?.data?.length || 0);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    data: { list: result?.data || [], pageMeta },
  };
};

const deleteNotificationTemplateService = async (params) => {
  let ids = [];
  if (params.id) ids.push(params?.id); else if (params.ids) {
    ids = params.ids
  }

  var newvalues = {
    $set: {
      isDeleted: true,
      updatedBy: params?.updatedBy,
      lastUpdatedBy: params?.lastUpdatedBy,
    },
  };

  const resp = await NotificationTemplate.updateMany({_id:ids}, newvalues);
  if (!resp.modifiedCount) {
    return {
      status: false,
      statusCode: statusCodes?.HTTP_UNPROCESSABLE_ENTITY,
      message: messages?.somethingWrong,
      data: [],
    };
  }
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.deleted,
    data: [],
  };
};

// export related api's

const exportNotificationTemplateService = async (res, params) => {
  //get all notificationTemplate list created by admin
  params.all = true;
  const notificationTemplateList = await getNotificationTemplateList(params);

  // format notificationTemplate data list
  params.type = "notificationTemplate";
  params.list = notificationTemplateList;

  //format the data based on notificationTemplate or trucker for csv file
  const formatList = await formatDataList(params);
  if (!formatList.status) {
    res.status(400).send({
      status: false,
      message: messages?.dataNotFound,
    });
  }

  //convtert formated data to csv file
  await convert_JSON_to_file(res, formatList, params);
  return res;
};

module.exports = {
  createNotificationTemplateService,
  getNotificationTemplateService,
  updateNotificationTemplateService,
  notificationTemplateListService,
  deleteNotificationTemplateService,
  exportNotificationTemplateService,
};
