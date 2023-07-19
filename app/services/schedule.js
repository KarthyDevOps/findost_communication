const {schedule}  = require("../models/schedule");
const { messages } = require("../response/customMesages");
const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const {pageMetaService} = require("../helpers/index")
const {google} = require('googleapis')
const {oauth2client} = require('../helpers/index')
const moment = require('moment')

const calendar =  google.calendar({
  version:"v3",
  auth:process.env.API_KEY
})

const addScheduleService = async (req, params) => {
  try {
  
    let result = await schedule.create(params)
    console.log('result', result)
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.scheduleCreated,
      data: result,
    };
  } catch (error) {
    console.log('error -->', error)
   
  }
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


 


  const findData = await schedule.findOne({
    $or: [
      {
        scheduleId: params.scheduleId,
      },
      {
        _id: params.id,
      },
    ],
  });

  console.log('findData', findData)

  let storeValue = {
    summary:findData?.summary,
    description:findData?.description,
    startTime:findData?.startTime,
    endTime:findDatay?.endTime,
    agenda:findData?.agenda,
   eventId:createEvent?.data?.id,
    createdBy : params?.createdBy,
    updatedBy : params?.createdBy,
    lastUpdatedBy :params?.lastUpdatedBy,
    mailType:req?.body?.mailType
  }

 
  const id = params?.id;

  var query = { $set: params };
  console.log("id", id);
  //update ScheduleListService details into ScheduleListService table
  const result = await schedule.updateOne({ _id: id }, storeValue);
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
const syncCalandarService = async (req,params) => {

  const findData = await schedule.findOne({
    $or: [
      {
        scheduleId: params.scheduleId,
      },
      {
        _id: params.id,
      },
    ],
  });
  console.log('findData-->', findData)

  
  let startdate = moment(findData?.startTime);
  let endDate = moment(startdate).add(10, 'minutes');  

  if (params?.mailType == "GOOGLE") {

    let createEvent = await calendar.events.insert({
      calendarId: "primary",
      auth: oauth2client,
      requestBody: {
        summary: findData?.summary,
        description: findData?.description,
        //  location: "Ramnad",
        start: {
          dateTime: new Date(startdate), //"2023-07-31T06:54:47.277+00:00",
          TimeZone: "Asia/kolkata",
        },
        end: {
          dateTime: new Date(endDate), // "2023-07-31T06:54:47.277+00:00",
          TimeZone: "Asia/kolkata",
        },
        attendees: [
          { email: params?.email }
        ],
      }
    })
    if (createEvent.data.status == "confirmed") {
      let storeValue = {
        summary: findData?.summary,
        description: findData?.description,
        startTime: findData?.startTime,
        endTime: endDate,
        agenda: findData?.agenda,
        eventId: createEvent?.data?.id,
        createdBy: params?.createdBy,
        updatedBy: params?.createdBy,
        lastUpdatedBy: params?.lastUpdatedBy,
        mailType: params?.mailType
      }
      const result = await schedule.updateOne({ _id: findData?._id }, storeValue);
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

    }
    else {
      return {
        status: false,
        statusCode: statusCodes?.HTTP_INTERNAL_SERVER_ERROR,
        message: messages?.notInserted,
        data: [],
      };
    }
  }

  else {

  }

 
  
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
    createdBy:params?.createdBy
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
  syncCalandarService
};
