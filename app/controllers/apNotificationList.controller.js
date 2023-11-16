const {
    sendErrorResponse,
    sendSuccessResponse,
} = require("../response/response");
const {
    apNotificationListService,
    apUpdateNotificationService
} = require("../services/apNotification.service");


const apUpdateNotification = async (req, res) => {
    const params = req.body;
    params.id = req?.query?.id || params.id;
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    params.authorizedPersonId = req?.user?._id;
    params.userType = req?.user?.userType;
    const result = await apUpdateNotificationService(params);
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

const apNotificationList = async (req, res) => {

    const params = req?.query;
    params.authorizedPersonId = req.user.apId || req?.user?._id;
    if (!params.limit) params.limit = 10
    if (!params.page) params.page = 1
    const result = await apNotificationListService(params);
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
    apUpdateNotification,
    apNotificationList
}