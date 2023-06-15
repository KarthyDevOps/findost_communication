const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../response/response");
const {
  notificationTemplateListService,
  createNotificationTemplateService,
  getNotificationTemplateService,
  updateNotificationTemplateService,
  deleteNotificationTemplateService,
  exportNotificationTemplateService,
} = require("../services/notificationTemplate.service");

const createNotificationTemplate = async (req, res) => {
  const params = req.body;
  params.createdBy = req?.user?._id?.toString();
  params.updatedBy = req?.user?._id?.toString();
  params.lastUpdatedBy = req?.user?.userType;
  params.userType = req?.user?.userType;
  const result = await createNotificationTemplateService(params);
  if (!result.status) {
    return sendErrorResponse(
      req,
      res,
      result?.statusCode,
      result?.message,
      result?.data
    );
  }
  return sendSuccessResponse(
    req,
    res,
    result?.statusCode,
    result?.message,
    result?.data
  );
};

const getNotificationTemplate = async (req, res) => {
  const params = req.body;
  params.notificationTemplateId = req?.query?.notificationTemplateId;
  const result = await getNotificationTemplateService(params);
  if (!result.status) {
    return sendErrorResponse(
      req,
      res,
      result?.statusCode,
      result?.message,
      result?.data
    );
  }
  return sendSuccessResponse(
    req,
    res,
    result?.statusCode,
    result?.message,
    result?.data
  );
};

const updateNotificationTemplate = async (req, res) => {
  const params = req.body;
  params.notificationTemplateId = req?.query?.notificationTemplateId;
  params.updatedBy = req?.user?._id?.toString();
  params.lastUpdatedBy = req?.user?.userType;
  params.userType = req?.user?.userType;
  const result = await updateNotificationTemplateService(params);
  if (!result.status) {
    return sendErrorResponse(
      req,
      res,
      result?.statusCode,
      result?.message,
      result?.data
    );
  }
  return sendSuccessResponse(
    req,
    res,
    result?.statusCode,
    result?.message,
    result?.data
  );
};

const notificationTemplateList = async (req, res) => {
  const params = req?.query;
  if(!params.limit) params.limit =10
  if(!params.page) params.page =1
  const result = await notificationTemplateListService(params);
  if (!result.status) {
    return sendErrorResponse(
      req,
      res,
      result?.statusCode,
      result?.message,
      result?.data
    );
  }
  return sendSuccessResponse(
    req,
    res,
    result?.statusCode,
    result?.message,
    result?.data
  );
};

const deleteNotificationTemplate = async (req, res) => {
  const params = req.body;
  if (req.query.id) {
    params.id = req?.query?.id;
  }
  params.ids = req.body.ids;
  params.updatedBy = req?.user?._id?.toString();
  params.lastUpdatedBy = req?.user?.userType;
  params.userType = req?.user?.userType;
  const result = await deleteNotificationTemplateService(params);
  if (!result.status) {
    return sendErrorResponse(
      req,
      res,
      result?.statusCode,
      result?.message,
      result?.data
    );
  }
  return sendSuccessResponse(
    req,
    res,
    result?.statusCode,
    result?.message,
    result?.data
  );
};

// export related api's

const exportNotificationTemplate = async (req, res) => {
  const params = {};
  const result = await exportNotificationTemplateService(res, params);
  return result;
  // if (!result.status) {
  //   return sendErrorResponse(
  //     req,
  //     res,
  //     result.statusCode,
  //     result.message,
  //     result.data
  //   );
  // }
  // return sendSuccessResponse(
  //   req,
  //   res,
  //   result.statusCode,
  //   result.message,
  //   result.data
  // );
};

module.exports = {
  createNotificationTemplate,
  getNotificationTemplate,
  updateNotificationTemplate,
  notificationTemplateList,
  deleteNotificationTemplate,
  exportNotificationTemplate,
};
