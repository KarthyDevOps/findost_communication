const {mailSendOptions} = require("../mailService/option")
const {
    sendErrorResponse,
    sendSuccessResponse,
  } = require("../response/response");

class MailController { }

MailController.sendMailWithAttachment = async (req, res, next) => {
  try {
   
    let body = req.body;
    console.log('body-->', body)
    let result = await mailSendOptions(body);
  console.log('result-->', result)
    return sendSuccessResponse(req, res, 200, "sucess",result );
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = MailController
