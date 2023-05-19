const { schedule } = require("../models/schedule");
const { messages } = require("../response/customMesages");
const { statusCodes } = require("../response/httpStatusCodes");
const bcrypt = require("bcryptjs");
const { statusMessage } = require("../response/httpStatusMessages");

const {pageMetaService} = require("../helpers/index")
//const { authorizedPersonsAddress } = require("../models/authorizedPerson-address");
const moment = require("moment-timezone");
//ScheduleListService profile related api's

const addScheduleService = async (req, params) => {
  console.log("params-->", params);
  //verify the given person already exist or not

  const scheduleData = await new schedule(params);
  const details = await scheduleData.save();
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.clientFamilyAdded,
    data: { _id: details._id },
  };
};

const getScheduleByIdService = async (params) => {
  console.log("params1");
  //get ScheduleListService details by ScheduleListService id
  const result = await schedule.findOne({
    $or: [
      {
        scheduleId: params.scheduleId,
      },
      {
        id: params.id,
      },
    ],
  });
  console.log('result', result)
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
      message: messages.scheduleListed,
      data: [],
    };
  }
};

const updateScheduleService = async (params) => {
  const id = params?.id;

  var query = { $set: params };
  console.log("id", id);
  //update ScheduleListService details into ScheduleListService table
  const result = await schedule.updateOne({ _id: id }, query);
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

const deleteScheduleService = async (params) => {
  const id = params?.id;
  var query = {
    $set: {
      isDeleted: true,
      updatedBy: params?.updatedBy,
      lastUpdatedBy: params?.lastUpdatedBy,
    },
  };

  //update ScheduleListService details into ScheduleListService table
  const result = await schedule.updateOne({ _id: id }, query);
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

const ScheduleListService = async (params) => {
  //get all ScheduleListService list
  const allList = await schedule.find({
    isDeleted: false,
  });
  console.log("allList", allList);

  //calculate pagemeta for pages and count
  const pageMeta = await pageMetaService(params, allList?.length || 0);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    data: { list: allList, pageMeta },
  };
};

module.exports = {
  addScheduleService,
  getScheduleByIdService,
  updateScheduleService,
  deleteScheduleService,
  ScheduleListService,
};
