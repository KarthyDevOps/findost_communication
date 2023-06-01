var { mail } = require("./index");

let mailSendOptions = async function (payloads) {
  let user, pass;
  // let verticalId = payloads.verticalId ? payloads.verticalId : '';
  user = process.env['USERMAIL'];
  pass = process.env['USERPASSWORD'];
  var mailOption = payloads;
  mailOption.from = user;
  // if (mailOption.verticalId) {
  //   delete mailOption.verticalId;
  // }
  var auths = {
    user,
    pass
  };
  var sendMail = await mail(mailOption, auths);
  return sendMail;
};
module.exports = {
  mailSendOptions: mailSendOptions,
};
