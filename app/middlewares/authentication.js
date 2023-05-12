const jwt = require("jsonwebtoken");
const { InternalServices } = require("./../apiServices");
const { sendErrorResponse } = require("../response/response");
const { statusCodes } = require("../response/httpStatusCodes");
const { messages } = require("../response/customMesages");
const verifyAdminToken = async (req, res, next) => {
  try {
    next();

    // if (req.headers["x-access-token"] || req.headers["authorization"]) {
    //   let token = req.headers["x-access-token"] || req.headers["authorization"];
    //   let decode, user;
    //   decode = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
    //   const userData = await InternalServices.getUserByCond({ _id: decoded?.userdata?._id });
    //   if ((!userData?.data || !userData?.data[0] || !userData?.data[0].isActive))
    //   {
    //     next();
    //   }
    //   else
    //   {
    //     return sendErrorResponse(
    //       req,
    //       res,
    //       statusCodes.HTTP_NOT_FOUND,
    //       messages.tokenInvalid,
    //       []
    //     );
    //   }
    
    //   req.user = user;
    //   req.user.userType = "admin";
      
      
    // } else {
    //   return sendErrorResponse(
    //     req,
    //     res,
    //     statusCodes.HTTP_UNAUTHORIZED,
    //     messages.tokenEmpty,
    //     []
    //   );
    // }
  } catch (error) {
    return sendErrorResponse(
      req,
      res,
      statusCodes.HTTP_NOT_FOUND,
      messages.tokenInvalid,
      []
    );
  }
};

const verifyAdminRole = (roles) => async function (req, res, next) {
  console.log(roles,'rolesrolesrolesroles===')
  next();
}


module.exports = {
  verifyAdminToken,
  verifyAdminRole
};
