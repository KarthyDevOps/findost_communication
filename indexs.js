const express = require('express');


const {google} = require('googleapis');

const app = express();

const PORT = 8000

const dayjs = require("dayjs")

const calendar =  google.calendar({
  version:"v3",
  auth:process.env.API_KEY
})

const oauth2client = new google.auth.OAuth2(
  "108197355321-8ov3shvk1dm0c0sslvu00bc2o503c9u1.apps.googleusercontent.com",
  "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",
  "http://localhost:8000/google/redirect"
)

let Scopes =  'https://www.googleapis.com/auth/calendar'

app.get("/google",(req,res)=>{
try {
  const url  = oauth2client.generateAuthUrl({
    access_type:"offline",
    scope: Scopes//'https://www.googleapis.com/auth/calender',
    
    })
  console.log('url-->', url)
  res.redirect(url)
} catch (error) {
  console.log("error",error)
}
})
app.get("/google/redirect", async (req, res) => {
  const code = req.query.code;

  const { tokens } = await oauth2client.getToken(code);
  oauth2client.setCredentials(tokens);
  res.send("you have sucessfully logged in");
});

app.get("/schedule",async(req,res)=>{
 try {
  console.log("data-->",oauth2client.credentials.access_token);

// Refer to the Node.js quickstart on how to setup the environment:
// https://developers.google.com/calendar/quickstart/node
// Change the scope to 'https://www.googleapis.com/auth/calendar' and delete any
// stored credentials.

// const event = {
//   'summary': 'DoodleBlue Company',
//   'location': 'RamanathaPuram',
//   'description': 'Kishore Testing',
//   start:{
//     dateTime: "2023-05-30T06:54:47.277+00:00",
//     timeZone: "Asia/kolkata",
//    },
//    'end':{
//     'dateTime': "2023-05-30T06:54:47.277+00:00",
//     'timeZone': "Asia/kolkata",
//    },
//   'recurrence': [
//     'RRULE:FREQ=DAILY;COUNT=2'
//   ],
//   'attendees': [
//     {'email': 'kishore.april28@gmail.com'}
//   ],
//   'reminders': {
//     'useDefault': false,
//     'overrides': [
//       {'method': 'email', 'minutes': 24 * 60},
//       {'method': 'popup', 'minutes': 10},
//     ],
//   },
// };

// await calendar.events.insert({
//   auth: oauth2client,
//   calendarId: 'primary',
//   resource: event,
// }, function(err, event) {
//   if (err) {
//     console.log('There was an error contacting the Calendar service: ' + err);
//     return;
//   }
//   console.log('Event created: %s', event.htmlLink);
// });


  await calendar.events.insert({
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
  },(err,event)=>{
    if(err){
   console.log('err', err)
    }
    console.log("data sucess sent")
  })
 } catch (error) {
  console.log('error-->', error)
 }
})

app.listen(PORT,()=>{
  console.log('server looking on the port', PORT)
})