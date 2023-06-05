const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const { messages } = require("../response/customMesages");
const { Notification } = require("../models/notification");

const {
  convert_JSON_to_file,
  formatDataList,
  pageMetaService,
} = require("../helpers/index");

const { getNotificationTemplateList } = require("./list.service");

const createNotificationService = async (params) => {
  var newvalues = params;
  const resp = await Notification.create(newvalues);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.created,
    data: {
      _id: resp?._id,
    },
  };
};

const getNotificationService = async (params) => {
  var payload = {
    _id: params?.notificationId,
    isDeleted: false,
  };
  const resp = await Notification.findOne(payload);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: resp,
  };
};

const updateNotificationService = async (params) => {
  var payload = {
    _id: params?.notificationId,
    isDeleted: false,
  };
  delete params["notificationId"];
  var newvalues = {
    $set: params,
  };
  const resp = await Notification.updateOne(payload, newvalues);
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

const notificationListService = async (params) => {
  params.all = true;
  const allList = await getNotificationTemplateList(params);
  params.all = params.returnAll == true ? true : false;

  const result = await getNotificationTemplateList(params);
  const pageMeta = await pageMetaService(params, allList?.data?.length || 0);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    data: { list: result?.data, pageMeta },
  };
};

const deleteNotificationService = async (params) => {
  var payload = {
    _id: params?.notificationId,
    isDeleted: false,
  };
  var newvalues = {
    $set: { isDeleted: true },
  };

  const resp = await Notification.updateOne(payload, newvalues);
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

const exportNotificationService = async (res, params) => {
  //get all notification list created by admin
  params.all = true;
  const notificationList = await getNotificationTemplateList(params);

  // format notification data list
  params.type = "notification";
  params.list = notificationList;

  //format the data based on notification or trucker for csv file
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
  createNotificationService,
  getNotificationService,
  updateNotificationService,
  notificationListService,
  deleteNotificationService,
  exportNotificationService,
};
