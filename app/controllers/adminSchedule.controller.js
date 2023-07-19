const { sendErrorResponse,sendSuccessResponse,} = require("../response/response");

const {addAdminScheduleService,getAdminScheduleByIdService,updateAdminScheduleService,deleteAdminScheduleService,adminScheduleListService,} = require("../services/adminSchedule");
const excelJs = require("exceljs");
const moment = require("moment");

const addAdminSchedule = async (req, res) => {
    const params = req.body;
    params.createdBy = req?.user?._id?.toString();
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    const result = await addAdminScheduleService(req, params);
    if (!result.status) {
        return sendErrorResponse( req,res,result?.statusCode,result?.message,result?.data);
    }
    return sendSuccessResponse( req,res,result?.statusCode,result?.message,result?.data);
};

const getAdminScheduleById = async (req, res) => {
    console.log("data");
    let params = {};
    params.id = req.query.id
    params.adminScheduleId =
        req?.query?.adminScheduleId;
    console.log("enter");
    const result = await getAdminScheduleByIdService(params);
    if (!result.status) {
        return sendErrorResponse( req,res,result?.statusCode, result?.message,result?.data);
    }
    return sendSuccessResponse( req,res,result?.statusCode,result?.message,result?.data);
};

const updateAdminSchedule = async (req, res) => {
    const params = req.body;
    params.id = req?.query?.id || req.user._id.toString();
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    const result = await updateAdminScheduleService(params);
    if (!result.status) {
        return sendErrorResponse( req,res,result?.statusCode, result?.message,result?.data);
    }
    return sendSuccessResponse( req,res,result?.statusCode,result?.message,result?.data);
};

const adminScheduleList = async (req, res) => {
    const params = req?.query;
    if(!params?.limit) params.limit =10
    if(!params?.page) params.page = 1
    params.limit = parseInt(params?.limit);
    params.page = parseInt(params?.page);
    params.createdBy = req?.user?._id.toString()
    const result = await adminScheduleListService(params);
    if (!result.status) {
        return sendErrorResponse( req,res,result?.statusCode, result?.message,result?.data);
    }
    console.log('12222222222222222222',req.query.export)
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

const deleteAdminSchedule = async (req, res) => {
    const params = req.body;
    if (req.query.id) {
        params.id = req?.query?.id;
    }
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    params.ids = req.body.ids;
    const result = await deleteAdminScheduleService(params);
    if (!result.status) {
        return sendErrorResponse(req, res, result?.statusCode, result?.message, result?.data);
    }
    return sendSuccessResponse(req, res, result?.statusCode, result?.message, result?.data);
};

module.exports = {
    addAdminSchedule,
    getAdminScheduleById,
    updateAdminSchedule,
    adminScheduleList,
    deleteAdminSchedule
};
