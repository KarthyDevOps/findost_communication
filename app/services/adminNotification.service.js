const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const { messages } = require("../response/customMesages");
const { adminNotification } = require("../models/adminNotification");

const { getAdminNotificationList } = require("./list.service");

const adminNotificationTemplate = require('../utils/adminNotificationTemplate')


const createAdminNotificationService = async (params) => {
    params.type ="LEAD_CREATED_NOTIFICATION";
    const [title, description] = await adminNotificationTemplate[params.type](params)
    params.title = title
    params.description = description
    var newvalues = params;
    const resp = await adminNotification.create(newvalues);
    console.log('resp-->', resp)
    return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        message: messages?.created,
        data: {
            _id: resp?._id,
        },
    };
};

const getAdminNotificationService = async (params) => {
  var payload = {
    _id: params?.faqId,
    isDeleted: false,
  };
  const resp = await adminNotification.findOne(payload);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: resp,
  };
};

const updateAdminNotificationService = async (params) => {
  var payload = {
    _id: params?.id,
    isDeleted: false,
  };
  var newvalues = {
    $set: {
        isRead:true
    },
  };
  const resp = await adminNotification.updateOne(payload, newvalues);
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

const AdminNotificationListService = async (params) => {
  params.all = true;
  const allList = await getAdminNotificationList(params);
  params.all = params.returnAll ==true ? true : false;

  const result = await getAdminNotificationList(params);
  const pageMeta = await pageMetaService(params, allList?.data?.length || 0);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    data: { list: result?.data, pageMeta },
  };
};

const deleteAdminNotificationService = async (params) => {
  let ids = [];
  if (params.id) ids.push(params?.id);
  else if (params.ids) {
    ids = params.ids;
  }
  var newvalues = {
    $set: {
      isDeleted: true,
      updatedBy: params?.updatedBy,
      lastUpdatedBy: params?.lastUpdatedBy,
    },
  };

  const resp = await adminNotification.updateMany({_id:ids}, newvalues);
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

module.exports = {
  createAdminNotificationService,
  getAdminNotificationService,
  updateAdminNotificationService,
  AdminNotificationListService,
  deleteAdminNotificationService,
};
