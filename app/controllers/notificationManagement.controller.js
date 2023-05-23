const {
    sendErrorResponse,
    sendSuccessResponse,
  } = require("../response/response");
  const {
    notificationListService,
    createNotificationService,
    getNotificationService,
    updateNotificationService,
    deleteNotificationService,
    exportNotificationService,
  } = require("../services/notification.service");
  
  const createNotification = async (req, res) => {
    const params = req.body;
    params.createdBy = req?.user?._id?.toString();
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    params.userType = req?.user?.userType;
    const result = await createNotificationService(params);
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
  
  const getNotification = async (req, res) => {
    const params = req.body;
    params.notificationId = req?.query?.notificationId;
    const result = await getNotificationService(params);
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
  
  const updateNotification = async (req, res) => {
    const params = req.body;
    params.notificationId = req?.query?.notificationId;
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    params.userType = req?.user?.userType;
    const result = await updateNotificationService(params);
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
  
  const notificationList = async (req, res) => {
    const params = req?.query;
    if(!params.limit) params.limit =10
    if(!params.page) params.page =1
    const result = await notificationListService(params);
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
  
  const deleteNotification = async (req, res) => {
    const params = req.body;
    params.notificationId = req?.query?.notificationId;
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    params.userType = req?.user?.userType;
    const result = await deleteNotificationService(params);
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
  
  const exportNotification = async (req, res) => {
    const params = {};
    const result = await exportNotificationService(res, params);
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
    createNotification,
    getNotification,
    updateNotification,
    notificationList,
    deleteNotification,
    exportNotification,
  };
  