const { schedule } = require("../models/schedule");
const { messages } = require("../response/customMesages");
const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const { pageMetaService, getAuthenticatedClient } = require("../helpers/index");
const { google } = require("googleapis");
const { oauth2client } = require("../helpers/index");
const moment = require("moment");
const { adminSchedule } = require("../models/adminSchedule");
const { getMyScheduleList } = require("./list.service");
const { default: mongoose } = require("mongoose");

const calendar = google.calendar({
  version: "v3",
  auth: process.env.API_KEY,
});

const addScheduleService = async (req, params) => {
  try {
    console.log("params-->", params);
    params.startTime = new Date(params?.startTime)
    params.date = moment(params?.startTime).format("YYYY-MM-DD");
    let result = await schedule.create(params);
    console.log("result", result);
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.scheduleCreated,
      data: result,
    };
  } catch (error) {
    console.log("error -->", error);
  }
};

const addMyScheduleService = async (req, params) => {
  try {
    if (params?.type == "FINDOC") {
      let getAdminSchedule = await adminSchedule.findOne({
        _id: params?.id,
      });

      let date = getAdminSchedule?.date;
      console.log('date-->', date)
      let startDate = getAdminSchedule?.startTime;
      let endDate = getAdminSchedule?.endTime;
      console.log('startDate -->', startDate)
      let startTime = moment(date + " " + startDate,"YYYY-MM-DD hh:mm A").format();
      console.log('startTime -->', startTime)

      let endTime = moment(date + " " + endDate, "YYYY-MM-DD hh:mm A").format();
      if (getAdminSchedule) {
        let storeValue = {
          summary: getAdminSchedule?.summary,
          description: getAdminSchedule?.description,
          startTime: startTime,
          endTime: endTime,
          date:date,
          agenda: getAdminSchedule?.agenda,
          place: getAdminSchedule?.agenda,
          speakerName: getAdminSchedule?.speakerName,
          imageUrl: getAdminSchedule?.imageUrlS3,
          createdBy: params?.createdBy,
          updatedBy: params?.createdBy,
          lastUpdatedBy: params?.lastUpdatedBy,
        };
        let result = await schedule.create(storeValue);
        console.log("result", result);
        return {
          status: true,
          statusCode: statusCodes?.HTTP_OK,
          message: messages?.scheduleCreated,
          data: result,
        };
      } else {
        return {
          status: false,
          statusCode: statusCodes?.HTTP_BAD_REQUEST,
          message: messages?.dataNotFound,
          data: [],
        };
      }
    }
  } catch (error) {
    console.log("error -->", error);
  }
};

const getScheduleByIdService = async (params) => {
  console.log("params1");
  //get ScheduleListService details by ScheduleListService id
  let result = await schedule.findOne({
    $or: [
      {
        scheduleId: params.scheduleId,
      },
      {
        _id: params.id,
      },
    ],
  });
  result = JSON.parse(JSON.stringify(result))

  result.startTime = moment.tz(result.startTime, "Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  result.endTime = moment.tz(result.endTime, "Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  console.log("result", result);
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

  console.log("findData", findData);

  let storeValue = {
    summary: findData?.summary,
    description: findData?.description,
    startTime: findData?.startTime,
    endTime: findDatay?.endTime,
    agenda: findData?.agenda,
    eventId: createEvent?.data?.id,
    createdBy: params?.createdBy,
    updatedBy: params?.createdBy,
    lastUpdatedBy: params?.lastUpdatedBy,
    mailType: req?.body?.mailType,
  };

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
// const syncCalandarService = async (req, params) => {
//   if (params.mailType == "GOOGLE" && !params.email) {
//     return {
//       status: false,
//       statusCode: statusCodes?.HTTP_BAD_REQUEST,
//       message: messages?.mailRequired,
//       data: [],
//     };
//   }
//   if (params.mailType == "MICROSOFT" && !req.body.accesstoken) {
//     return {
//       status: false,
//       statusCode: statusCodes?.HTTP_BAD_REQUEST,
//       message: messages?.accessTokenRequired,
//       data: [],
//     };
//   }

//   let findDatas = await schedule.find({
//     $or: [
//       {
//         scheduleId: params.scheduleId,
//       },
//       {
//         _id: { $in: params.id.map(_id =>new mongoose.Types.ObjectId(_id))  },
//       },
//     ],
//   });
//   console.log("findDatas-->", findDatas);
//   for (let findData of findDatas) {
//     let startdate = moment(findData?.startTime).subtract(5, 'hours').subtract(30, 'minutes');
//     let endDate = moment(startdate).add(20, "minutes");

//     console.log("startTime",startdate,"endTme",endDate)
//     if (params?.mailType == "GOOGLE") {
//       let createEvent = await calendar.events.insert({
//         calendarId: "primary",
//         auth: oauth2client,
//         requestBody: {
//           summary: findData?.summary,
//           description: findData?.description,
//           //  location: "Ramnad",
//           start: {
//             dateTime: new Date(startdate), //"2023-07-31T06:54:47.277+00:00",
//             TimeZone: "Asia/kolkata",
//           },
//           end: {
//             dateTime: new Date(endDate), // "2023-07-31T06:54:47.277+00:00",
//             TimeZone: "Asia/kolkata",
//           },
//           attendees: [{ email: params?.email }],
//         },
//       });
//       if (createEvent.data.status == "confirmed") {
//         let storeValue = {
//           summary: findData?.summary,
//           description: findData?.description,
//           startTime: findData?.startTime,
//           endTime: endDate,
//           agenda: findData?.agenda,
//           eventId: createEvent?.data?.id,
//           createdBy: params?.createdBy,
//           updatedBy: params?.createdBy,
//           lastUpdatedBy: params?.lastUpdatedBy,
//           mailType: params?.mailType,
//         };
//         const result = await schedule.updateOne(
//           { _id: findData?._id },
//           storeValue
//         );
//         console.log("result -->", result);
//         if (!result.modifiedCount) {
//           return {
//             status: false,
//             statusCode: statusCodes?.HTTP_BAD_REQUEST,
//             message: messages?.userNotExist,
//             data: [],
//           };
//         }
//         return {
//           status: true,
//           statusCode: statusCodes?.HTTP_OK,
//           message: messages?.updated,
//           data: [],
//         };
//       } else {
//         return {
//           status: false,
//           statusCode: statusCodes?.HTTP_INTERNAL_SERVER_ERROR,
//           message: messages?.notInserted,
//           data: [],
//         };
//       }
//     }
//     else if (params?.mailType == "MICROSOFT") {
//       const event = {
//         subject: findData?.summary,
//         body: {
//           contentType: "text",
//           content: findData?.description,
//         },
//         start: {
//           dateTime: new Date(startdate.utcOffset(0,true)),
//           timeZone: "India Standard Time",
//         },
//         end: {
//           dateTime: new Date(endDate.utcOffset(0,true)),
//           timeZone: "India Standard Time",
//         },
//       };
//       console.log("data",event)
  
//       let token = req?.body?.accesstoken;
  
//       console.log("token-->", token);
  
//       let client = getAuthenticatedClient(token);
  
//       let microsoftCreateEvent = await client.api("/me/events").post(event);
  
//       console.log("microsoftCreateEvent-->", microsoftCreateEvent);
  
//       if (microsoftCreateEvent.createdDateTime) {
//         let storeValue = {
//           summary: findData?.summary,
//           description: findData?.description,
//           startTime: findData?.startTime,
//           endTime: endDate,
//           agenda: findData?.agenda,
//           eventId: microsoftCreateEvent?.iCalUId,
//           createdBy: params?.createdBy,
//           updatedBy: params?.createdBy,
//           lastUpdatedBy: params?.lastUpdatedBy,
//           mailType: params?.mailType,
//         };
//         const result = await schedule.updateOne(
//           { _id: findData?._id },
//           storeValue
//         );
//         console.log("result -->", result);
//         if (!result.modifiedCount) {
//           return {
//             status: false,
//             statusCode: statusCodes?.HTTP_BAD_REQUEST,
//             message: messages?.userNotExist,
//             data: [],
//           };
//         }
//         return {
//           status: true,
//           statusCode: statusCodes?.HTTP_OK,
//           message: messages?.updated,
//           data: [],
//         };
//       }
//       console.log("datas--->", data);
//     } else {
//       return {
//         status: false,
//         statusCode: statusCodes?.HTTP_INTERNAL_SERVER_ERROR,
//         message: messages?.notInserted,
//         data: [],
//       };
//     }
//   }
// };

const syncCalandarService = async (req, params) => {
  if (params.mailType == "GOOGLE" && !params.email) {
    return {
      status: false,
      statusCode: statusCodes?.HTTP_BAD_REQUEST,
      message: messages?.mailRequired,
      data: [],
    };
  }
  let findDatas = await schedule.find({
    $or: [
      {
        scheduleId: params.scheduleId,
      },
      {
        _id: { $in: params.id.map((_id) => new mongoose.Types.ObjectId(_id)) },
      },
    ],
    isGoogleSynced:false
  });
 
  for (let findData of findDatas) {
    console.log("findDatas-->", findDatas);
    let startdate = moment(findData?.startTime).subtract(5, "hours").subtract(30, "minutes");
    let endDate = moment(startdate).add(20, "minutes");

    console.log("startTime", startdate, "endTime", endDate);

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
        attendees: [{ email: params?.email }],
      },
    });

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
        mailType: params?.mailType,
        isGoogleSynced : true
      };
      await schedule.updateOne({ _id: findData?._id.toString() }, storeValue);

    }
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
  params.all = true;
  const allList = await getMyScheduleList(params);
  params.all =
    params.returnAll == true || params.isExport == true ? true : false;
  const result = await getMyScheduleList(params);
  const pageMeta = await pageMetaService(params, allList?.data?.length || 0);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    data: { list: result?.data, pageMeta },
  };
};

module.exports = {
  addScheduleService,
  getScheduleByIdService,
  updateScheduleService,
  deleteScheduleService,
  ScheduleListService,
  syncCalandarService,
  addMyScheduleService,
};
