const joi = require("joi");
const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const { joierrors } = require("../response/response");
const options = {
  // generic option
  basic: {
    abortEarly: false,
    convert: true,
    allowUnknown: false,
    stripUnknown: true,
  },
  // Options for Array of array
  array: {
    abortEarly: false,
    convert: true,
    allowUnknown: true,
    stripUnknown: {
      objects: true,
    },
  },
};

const bodyParamValidation = (req, res, next, schama) => {
  let schema = schama;
  let option = options.basic;
  var { error, value } = schema.validate(req.body, option);
  if (error && Object.keys(error).length > 0) {
    joierrors(
      req,
      res,
      statusCodes.HTTP_BAD_REQUEST,
      statusMessage[400],
      error
    );
  } else {
    next();
  }
};

const queryParamValidation = (req, res, next, schama) => {
  let schema = schama;
  let option = options.basic;
  var { error, value } = schema.validate(req.query, option);
  if (error && Object.keys(error).length > 0) {
    joierrors(
      req,
      res,
      statusCodes.HTTP_BAD_REQUEST,
      statusMessage[400],
      error
    );
  } else {
    if (req?.bodyParam) return;
    else next();
  }
};


const notificationTemplateListValidation = (req, res, next) => {
  const schema = joi.object({
    search: joi.allow(null).allow(""),
    isActive: joi.allow(null).allow(""),
    limit: joi.number(),
    page: joi.number(),
  });
  return queryParamValidation(req, res, next, schema);
};

const createNotificationTemplateValidation = (req, res, next) => {
  const schema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    isActive: joi.boolean()
  });
  return bodyParamValidation(req, res, next, schema);
};

const getNotificationTemplateValidation = (req, res, next) => {
  const querySchema = joi.object({
    notificationTemplateId: joi.string().allow(null).allow(""),
  });
  req.bodyParam = false;
  queryParamValidation(req, res, next, querySchema);
};

const updateNotificationTemplateValidation = (req, res, next) => {
  const querySchema = joi.object({
    notificationTemplateId: joi.string().allow(null).allow(""),
  });
  req.bodyParam = true;
  queryParamValidation(req, res, next, querySchema);

  const schema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    isActive: joi.boolean()
  });
  return bodyParamValidation(req, res, next, schema);
};

const deleteNotificationTemplateValidation = (req, res, next) => {
  const querySchema = joi.object({
    notificationTemplateId: joi.string().allow(null).allow(""),
  });
  req.bodyParam = false;
  queryParamValidation(req, res, next, querySchema);
};



//schedule module

const scheduleListValidation = (req, res, next) => {
  const schema = joi.object({
    search: joi.allow(null).allow(""),
    isActive: joi.allow(null).allow(""),
    limit: joi.number(),
    page: joi.number(),
  });
  return queryParamValidation(req, res, next, schema);
};

const createScheduleValidation = (req, res, next) => {
  const schema = joi.object({
    scheduleName: joi.string().required(),
    date: joi.string().required(),
    time: joi.string().required(),
    agenda: joi.string().required(),
    notes: joi.string().required(),
    isActive: joi.string().required(),
  });
  return bodyParamValidation(req, res, next, schema);
};

const getScheduleValidation = (req, res, next) => {
  const querySchema = joi.object({
    id: joi.string().allow(null).allow(""),
  });
  req.bodyParam = false;
  queryParamValidation(req, res, next, querySchema);
};

const updateScheduleValidation = (req, res, next) => {
  const querySchema = joi.object({
    id: joi.string().allow(null).allow(""),

  });
  req.bodyParam = true;
  queryParamValidation(req, res, next, querySchema);

  const schema = joi.object({
    scheduleName: joi.string().optional(),
    date: joi.string().optional(),
    time: joi.string().optional(),
    agenda: joi.string().optional(),
    notes: joi.string().optional(),
    isActive: joi.string().optional(),
  });
  return bodyParamValidation(req, res, next, schema);
};

const deleteScheduleValidation = (req, res, next) => {
  const querySchema = joi.object({
    id: joi.string().allow(null).allow(""),
  });
  req.bodyParam = false;
  queryParamValidation(req, res, next, querySchema);
};



module.exports = {
  bodyParamValidation,
  queryParamValidation,
  notificationTemplateListValidation,
  createNotificationTemplateValidation,
  getNotificationTemplateValidation,
  updateNotificationTemplateValidation,
  deleteNotificationTemplateValidation,
  scheduleListValidation, //<----schedule module
  createScheduleValidation,
  getScheduleValidation,
  updateScheduleValidation,
  deleteScheduleValidation,
};
