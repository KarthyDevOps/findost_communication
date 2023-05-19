// import { Router } from "express";
const express = require("express");
const Router = express.Router;
const { routes } = require("../routes/routes");
const { verifyAdminToken,verifyAdminRole } = require("../middlewares/authentication");
const {
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
} = require("../validator/validator");

const {
  notificationTemplateList,
  createNotificationTemplate,
  getNotificationTemplate,
  updateNotificationTemplate,
  deleteNotificationTemplate,
  exportNotificationTemplate,
} = require("../controllers/notificationTemplateManagement.controller");

const { addSchedule,
  getScheduleById,
  updateSchedule,
  scheduleList,
  deleteSchedule} = require("../controllers/schedule.controller")
const { errHandle } = require("../helpers/index");

const router = Router();
//PRODUCT Management
router.get(
  routes.v1.notificationTemplateManagement.list,
  [verifyAdminToken,verifyAdminRole("notificationTemplateManagement","VIEW"), notificationTemplateListValidation],
  errHandle(notificationTemplateList)
);
router.post(
  routes.v1.notificationTemplateManagement.create,
  [verifyAdminToken,verifyAdminRole("notificationTemplateManagement","ADD"), createNotificationTemplateValidation],
  errHandle(createNotificationTemplate)
);
router.get(
  routes.v1.notificationTemplateManagement.get,
  [verifyAdminToken,verifyAdminRole("notificationTemplateManagement","VIEW"), getNotificationTemplateValidation],
  errHandle(getNotificationTemplate)
);
router.put(
  routes.v1.notificationTemplateManagement.update,
  [verifyAdminToken,verifyAdminRole("notificationTemplateManagement","UPDATE"), updateNotificationTemplateValidation],
  errHandle(updateNotificationTemplate)
);
router.delete(
  routes.v1.notificationTemplateManagement.delete,
  [verifyAdminToken,verifyAdminRole("notificationTemplateManagement","DELETE"), deleteNotificationTemplateValidation],
  errHandle(deleteNotificationTemplate)
);


//schedule module
router.post(routes.v1.schedule.create,[createScheduleValidation],addSchedule)
router.get(routes.v1.schedule.list,[scheduleListValidation],scheduleList)
router.put(routes.v1.schedule.update,[updateScheduleValidation],updateSchedule)
router.delete(routes.v1.schedule.delete,[deleteScheduleValidation],deleteSchedule)
router.get(routes.v1.schedule.get,[getScheduleValidation],getScheduleById)

module.exports = router;
