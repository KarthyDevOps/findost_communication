const { sendErrorResponse,sendSuccessResponse,} = require("../response/response");

const {addAdminScheduleService,getAdminScheduleByIdService,updateAdminScheduleService,deleteAdminScheduleService,adminScheduleListService,} = require("../services/adminSchedule");

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
    params.createdBy = req?.user?._id.toString()
    const result = await adminScheduleListService(params);
    if (!result.status) {
        return sendErrorResponse( req,res,result?.statusCode, result?.message,result?.data);
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
