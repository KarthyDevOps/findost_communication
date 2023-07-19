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
    syncCalandarService
} = require("../services/schedule");

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

const syncCalendarSchedule = async (req, res) => {
  const params = req.body;
  params.id = req?.body?.id;
  params.createdBy = req?.user?._id?.toString();
  params.updatedBy = req?.user?._id?.toString();
  params.lastUpdatedBy = req?.user?.userType;
  const result = await syncCalandarService(req, params);
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
  params.id = req.query.id
  params.scheduleId =
    req?.query?.scheduleId ;
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
  params.createdBy = req?.user?._id.toString()
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
    deleteSchedule,
    syncCalendarSchedule
};
