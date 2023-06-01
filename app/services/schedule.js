const { schedule } = require("../models/schedule");
const { messages } = require("../response/customMesages");
const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const {pageMetaService} = require("../helpers/index")
const {google} = require('googleapis')



const calendar =  google.calendar({
  version:"v3",
  auth:process.env.API_KEY
})

const oauth2client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
)

let Scopes =  process.env.Google_Calender


//ScheduleListService profile related api's

const getAccessService = async (req, res) => {
  try {
    const url = oauth2client.generateAuthUrl({
      access_type: "offline",
      scope: Scopes,
    });
    if (url) {
      console.log("url--->",url)
      return url
      //const code = req.query.code;
      // const { tokens } = await oauth2client.getToken(code);
      // oauth2client.setCredentials(tokens);
    }
  } catch (error) {
    console.log("error", error);
  }
};

const addScheduleService = async (req, params) => {
  let code = "4/0AbUR2VPXyKxQaubiSNyggvOrzr-3bI2KoQCcxh3ytfFYKH_MF3JWr1T6buUSg93CwaHwIQ"
  try {
    const { tokens } = await oauth2client.getToken(code);
    oauth2client.setCredentials(tokens);
    
  } catch (error) {
    console.log('error', error)
  }
  console.log("params-->")
 // console.log("data-->",oauth2client.credentials.access_token);

  //verify the given person already exist or not
  try {
    let data =  await calendar.events.insert({
      calendarId:"primary",
      auth:oauth2client,
      requestBody:{
        summary: "this is a test event",
        description:"welcome",
        location:"ramnad0",
        start:{
         dateTime: "2023-05-31T06:54:47.277+00:00",
         TimeZone: "Asia/kolkata",
        },
        end:{
         dateTime: "2023-05-31T06:54:47.277+00:00",
         TimeZone: "Asia/kolkata",
        },
        attendees: [
             {email: 'kishore.april28@gmail.com'}
           ],
      }
     })

  console.log("the data -->",data)
  } catch (error) {
    console.log('error', error)
  }

 
   delete params.code ;

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
  getAccessService,
  addScheduleService,
  getScheduleByIdService,
  updateScheduleService,
  deleteScheduleService,
  ScheduleListService,
};
