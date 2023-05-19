const mongoose = require("mongoose");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../response/response");

const {
    addScheduleService,
    getScheduleByIdService,
    updateScheduleService,
    deleteScheduleService,
    ScheduleListService, 
} = require("../services/schedule");

//schedule profile related api's


const addSchedule = async (req, res) => {
  const params = req.body;
  params.createdBy = req?.user?._id?.toString();
  params.updatedBy = req?.user?._id?.toString();
  params.lastUpdatedBy = req?.user?.userType;
  const result = await addScheduleService(req, params);
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

const getScheduleById = async (req, res) => {
  console.log("data");
  let params = {};
  params.scheduleId =
    req?.query?.scheduleId || req.user._id.toString();
  console.log("enter");
  const result = await getScheduleByIdService(params);
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

const updateSchedule = async (req, res) => {
  const params = req.body;
  params.id =
    req?.query?.id || req.user._id.toString();
  params.updatedBy = req?.user?._id?.toString();
  params.lastUpdatedBy = req?.user?.userType;
  const result = await updateScheduleService(params);
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

const scheduleList = async (req, res) => {
  const params = req?.query;
  const result = await ScheduleListService(params);
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

const deleteSchedule = async (req, res) => {
  const params = req.body;
  params.id = req?.query?.id || req.user._id.toString();
  params.updatedBy = req?.user?._id?.toString();
  params.lastUpdatedBy = req?.user?.userType;
  const result = await deleteScheduleService(params);
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
    addSchedule,
    getScheduleById,
    updateSchedule,
    scheduleList,
    deleteSchedule
};
