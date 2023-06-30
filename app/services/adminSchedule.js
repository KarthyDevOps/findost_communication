const { messages } = require("../response/customMesages");
const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const { pageMetaService } = require("../helpers/index")
const { adminSchedule } = require("../models/adminSchedule");

const addAdminScheduleService = async (req, params) => {
    try {
        const createAdminSchedule = await new adminSchedule(params);
        const result = await createAdminSchedule.save();
        if (result) {
            return {
                status: true,
                statusCode: statusCodes?.HTTP_OK,
                message: messages?.scheduleCreated,
                data: result,
            };
        }
        else {
            return {
                status: false,
                statusCode: statusCodes?.HTTP_INTERNAL_SERVER_ERROR,
                message: messages?.notInserted,
                data: [],
            };
        }
    } catch (error) {
        console.log('error -->', error)
    }
};

const getAdminScheduleByIdService = async (params) => {
    console.log("params-->", params)
    //get ScheduleListService details by ScheduleListService id
    const result = await adminSchedule.findOne(
        {
            _id: params?.id,
            isDeleted: false
        });
    //console.log('result', result)
    if (result) {
        return {
            status: true,
            statusCode: statusCodes?.HTTP_OK,
            message: statusMessage.success,
            data: result,
        };
    } else {
        return {
            status: false,
            statusCode: statusCodes?.HTTP_BAD_REQUEST,
            message: messages.dataNotFound,
            data: [],
        };
    }
};

const updateAdminScheduleService = async (params) => {
    const id = params?.id;
    var query = { $set: params };
    console.log("id", id);
    //update ScheduleListService details into ScheduleListService table
    const result = await adminSchedule.updateOne({ _id: id }, query);
    console.log("result -->", result);
    if (!result.modifiedCount) {
        return {
            status: false,
            statusCode: statusCodes?.HTTP_BAD_REQUEST,
            message: messages?.userNotExist,
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

const deleteAdminScheduleService = async (params) => {
    let ids = [];
    if (params.id) ids.push(params?.id); else if (params.ids) {
      ids = params.ids
    }
    var query = {
        $set: {
            isDeleted: true,
            updatedBy: params?.updatedBy,
            lastUpdatedBy: params?.lastUpdatedBy,
        },
    };
    //update ScheduleListService details into ScheduleListService table
    const result = await adminSchedule.updateMany({ _id: ids }, query);
    if (!result.modifiedCount) {
        return {
            status: false,
            statusCode: statusCodes?.HTTP_BAD_REQUEST,
            message: messages?.userNotExist,
            data: [],
        };
    }
    return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        message: messages?.scheduleDeleted,
        data: [],
    };
};

const adminScheduleListService = async (params) => {
    console.log("params", params)
    let cond = {};
    cond.isDeleted = false
    let page = params?.page || 1;
    page = Number(page);
    let limit = params?.limit || 10;
    limit = Number(limit);

    if (params.search) {
        cond.$or = [
            { adminScheduleId: { $regex: `${params?.search}`, $options: "i" } },
            { summary: { $regex: `${params?.search}`, $options: "i" } },
        ];
    }
    if (params.isActive) {
        cond.isActive = params?.isActive
    }
    //get all ScheduleListService list
    let totalCount = await adminSchedule.find(cond).countDocuments();
    let data = await adminSchedule.find(cond).sort({ createdAt: -1 }).skip(limit * (page - 1)).limit(limit);
    //calculate pagemeta for pages and count
    const pageMeta = await pageMetaService(params, totalCount);

    if (data.length > 0) {
        return {
            status: true,
            statusCode: statusCodes?.HTTP_OK,
            data: { list: data, pageMeta },
        };

    }
    else {
        return {
            status: false,
            statusCode: statusCodes?.HTTP_OK,
            data: { list: data, pageMeta },
        };

    }

};

module.exports = {
    addAdminScheduleService,
    getAdminScheduleByIdService,
    updateAdminScheduleService,
    deleteAdminScheduleService,
    adminScheduleListService,
};
