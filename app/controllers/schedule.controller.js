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
    syncCalandarService,
    addMyScheduleService,
} = require("../services/schedule");

const excelJs = require('exceljs')
const moment = require("moment");

const addSchedule = async (req, res) => {
  const params = req.body;
   params.apId = req?.user?.apId;
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

const addMySchedule = async (req, res) => {
  const params = req.body;
   params.apId = req?.user?.apId;
  params.createdBy = req?.user?._id?.toString();
  params.updatedBy = req?.user?._id?.toString();
  params.lastUpdatedBy = req?.user?.userType;
  const result = await addMyScheduleService(req, params);
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
  if(!params?.limit) params.limit =10
  if(!params?.page) params.page = 1
  params.limit = parseInt(params?.limit);
  params.page = parseInt(params?.page);
  params.createdBy = req?.user?._id.toString()
  const result = await ScheduleListService(params);
  if (!result.status) {
      return sendErrorResponse( req,res,result?.statusCode, result?.message,result?.data);
  }
  if (String(req.query.isExport) == "true" && result?.data?.list) {
      console.log('1111')
    let workbook = new excelJs.Workbook();
    let worksheet = workbook.addWorksheet("Sheet1");

    worksheet.columns = [
        { header: "summary", key: "summary", width: 15 },
        { header: "description", key: "description", width: 25 },
        { header: "date", key: "date", width: 25 },
        { header: "startTime", key: "startTime", width: 25 },
        { header: "endTime", key: "endTime", width: 25 },
        { header: "agenda", key: "agenda", width: 25 },
        { header: "speakerName", key: "speakerName", width: 25 },
        { header: "place", key: "place", width: 25 }
    ];
    let workData = result?.data?.list || [];
    console.log(workData)
   // if (workData?.length) workData = workData?.map(w => ({ ...w, fullName: w?.userDetails?.fullName || "" }))
    worksheet.addRows(result?.data?.list);
    res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + `Sales Statistics-${moment().format('YYYY-MM-DD-hh-mm-ss')}.xlsx`
    );

    await workbook.xlsx.write(res);
    return res.status(statusCodes.HTTP_OK).end();
}

  return sendSuccessResponse( req,res,result?.statusCode,result?.message,result?.data);
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
    syncCalendarSchedule,
    addMySchedule
};
