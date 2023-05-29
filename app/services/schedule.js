const { schedule } = require("../models/schedule");
const { messages } = require("../response/customMesages");
const { statusCodes } = require("../response/httpStatusCodes");
const bcrypt = require("bcryptjs");
const { statusMessage } = require("../response/httpStatusMessages");

const {pageMetaService} = require("../helpers/index")
//const { authorizedPersonsAddress } = require("../models/authorizedPerson-address");
const moment = require("moment-timezone");




const {google} = require('googleapis');



// Provide the required configuration
const CREDENTIALS = process.env.CREDENTIALS;
const calendarId = process.env.CALENDAR_ID;

// Google calendar API settings
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({version : "v3"});

const auth = new google.auth.JWT(
   process.env.calender_id,
    null,
    process.env.private_key,
    SCOPES
);

// Your TIMEOFFSET Offset
const TIMEOFFSET = '+05:30';

// Get date-time string for calender
const dateTimeForCalander = () => {

    let date = new Date();

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let day = date.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    let minute = date.getMinutes();
    if (minute < 10) {
        minute = `0${minute}`;
    }

    let newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000${TIMEOFFSET}`;

    let event = new Date(Date.parse(newDateTime));

    let startDate = event;
    // Delay in end time is 1
    let endDate = new Date(new Date(startDate).setHours(startDate.getHours()+1));

    return {
        'start': startDate,
        'end': endDate
    }
};

// Insert new event to Google Calendar
const insertEvent = async (event) => {

    try {
        let response = await calendar.events.insert({
            auth: auth,
           calendarId:"c_fd7f86e3edb684be9ddf6ff45b09d439a6960f27cdd6d69aa5977c11ca489766@group.calendar.google.com",
            resource: event
        });
    
        if (response['status'] == 200 && response['statusText'] === 'OK') {
            return 1;
        } else {
            return 0;
        }
    } catch (error) {
        console.log(`Error at insertEvent1 --> ${error}`);
        return 0;
    }
};

let dateTime = dateTimeForCalander();

// Event for Google Calendar
let event = {
    'summary': `This is the summary.`,
    'description': `This is the description.`,
    'start': {
        'dateTime': dateTime['start'],
        'timeZone': 'Asia/Kolkata'
    },
    'end': {
        'dateTime': dateTime['end'],
        'timeZone': 'Asia/Kolkata'
    }
};

insertEvent(event)
    .then((res) => {
        console.log("done-->",res);
    })
    .catch((err) => {
        console.log("err-->",err);
    });

// Get all the events between two dates
// const getEvents = async (dateTimeStart, dateTimeEnd) => {

//     try {
//         let response = await calendar.events.list({
//             auth: auth,
//             calendarId: calendarId,
//             timeMin: dateTimeStart,
//             timeMax: dateTimeEnd,
//             timeZone: 'Asia/Kolkata'
//         });
    
//         let items = response['data']['items'];
//         return items;
//     } catch (error) {
//         console.log(`Error at getEvents --> ${error}`);
//         return 0;
//     }
// };

// let start = '2020-10-03T00:00:00.000Z';
// let end = '2020-10-04T00:00:00.000Z';

// getEvents(start, end)
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// Delete an event from eventID
// const deleteEvent = async (eventId) => {

//     try {
//         let response = await calendar.events.delete({
//             auth: auth,
//             calendarId: calendarId,
//             eventId: eventId
//         });

//         if (response.data === '') {
//             return 1;
//         } else {
//             return 0;
//         }
//     } catch (error) {
//         console.log(`Error at deleteEvent --> ${error}`);
//         return 0;
//     }
// };

// let eventId = 'hkkdmeseuhhpagc862rfg6nvq4';

// deleteEvent(eventId)
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });


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
