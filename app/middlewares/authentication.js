const jwt = require("jsonwebtoken");
const { InternalServices } = require("./../apiServices");
const { sendErrorResponse } = require("../response/response");
const { statusCodes } = require("../response/httpStatusCodes");
const { messages } = require("../response/customMesages");
const verifyAdminToken = async (req, res, next) => {
  try {
    if (
      req.headers["x-access-token"] ||
      req.headers["authorization"] ||
      req.headers["Authorization"]
    ) {
      const token = req.header("Authorization").replace("Bearer ", "");
      let decode, user;
      decode = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
      const userData = await InternalServices.getUserById({ _id: decode?._id });
      if (userData?.data) {
        if (!userData?.data.isActive) {
          return sendErrorResponse(
            req,
            res,
            statusCodes.HTTP_NOT_FOUND,
            messages.adminInActive,
            []
          );
        } else {
          req.user = userData?.data;
          req.user.userType = "admin";
          next();
        }
      } else {
        return sendErrorResponse(
          req,
          res,
          statusCodes.HTTP_NOT_FOUND,
          messages.tokenInvalid,
          []
        );
      }
    } else {
      return sendErrorResponse(
        req,
        res,
        statusCodes.HTTP_UNAUTHORIZED,
        messages.tokenEmpty,
        []
      );
    }
  } catch (error) {
    console.log(error);
    return sendErrorResponse(
      req,
      res,
      statusCodes.HTTP_NOT_FOUND,
      messages.tokenInvalid,
      []
    );
  }
};
const verifyAdminRole = (roles, action) =>
  async function (req, res, next) {
    let isPermissionDenied = true;
    if (req.user && req.user.permissions) {
      if (req.user.permissions[roles]) {
        if (
          req.user.permissions[roles].indexOf(action.toString()) ||
          req.user.permissions[roles].indexOf("ALL")
        ) {
          isPermissionDenied = false;
        }
      }
    }
    if (isPermissionDenied) {
      return sendErrorResponse(
        req,
        res,
        statusCodes.HTTP_NOT_FOUND,
        messages.accessDenied,
        []
      );
    } else {
      next();
    }
  };
module.exports = {
  verifyAdminToken,
  verifyAdminRole,
};
