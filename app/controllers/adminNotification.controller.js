const {
    sendErrorResponse,
    sendSuccessResponse,
  } = require("../response/response");
  const {
createAdminNotificationService,updateAdminNotificationService,deleteAdminNotificationService,AdminNotificationListService, getAdminNotificationService
  } = require("../services/adminNotification.service");
const { adminScheduleListService } = require("../services/adminSchedule");
  
  const createAdminNotification = async (req, res) => {
    const params = req.body;
    console.log("params-->",params)
    const result = await createAdminNotificationService(params);
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
  
  const getAdminNotification = async (req, res) => {
    const params = req.body;
    params.faqId = req?.query?.id;
    const result = await getAdminNotificationService(params);
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
  
  const updateAdminNotification = async (req, res) => {
    const params = req.body;
    params.id = req?.query?.id;
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    params.userType = req?.user?.userType;
    const result = await updateAdminNotificationService(params);
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
  
  const adminNotificationList = async (req, res) => {
    const params = req?.query;
    if(!params?.limit) params.limit =10
    if(!params?.page) params.page = 1
    params.limit = parseInt(params?.limit);
    params.page = parseInt(params?.page);
    console.log("req", params);
    const result = await AdminNotificationListService(params);
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
  
  const deleteAdminNotification = async (req, res) => {
    
    const params = req.body;
    if (req.query.id) {
      params.id = req?.query?.id;
    }
    params.ids = req.body.ids;
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    params.userType = req?.user?.userType;
    const result = await deleteAdminNotificationService(params);
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
  
  module.exports = {
    createAdminNotification,
    getAdminNotification,
    updateAdminNotification,
    adminNotificationList,
    deleteAdminNotification
  };
  