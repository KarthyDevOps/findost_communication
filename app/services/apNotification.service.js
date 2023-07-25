const { apNotification } = require("../models/apNotification");
const { getApNotificationList } = require("./list.service");
const { pageMetaService } = require("../helpers/index");
const { statusCodes } = require("../response/httpStatusCodes");
const { messages } = require("../response/customMesages");

const apNotificationListService = async (params) => {
    params.all = true;
    const allList = await getApNotificationList(params);
    params.all = params.returnAll == true ? true : false;

    const result = await getApNotificationList(params);
    const pageMeta = await pageMetaService(params, allList?.data?.length || 0);
    return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        data: { list: result?.data, pageMeta },
    };
};
const apUpdateNotificationService = async (params) => {
    var payload = {
        _id: params?.id,
        authorizedPersonId: params?.authorizedPersonId,
        isDeleted: false
    };
    var newvalues = {
        $set: params,
    };
    console.log('payload', payload,newvalues)
    const resp = await apNotification.updateOne(payload, newvalues);
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


module.exports = {

    apUpdateNotificationService,
    apNotificationListService,

};