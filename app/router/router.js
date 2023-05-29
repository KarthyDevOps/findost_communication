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

  notificationListValidation,
  createNotificationValidation,
  getNotificationValidation,
  updateNotificationValidation,
  deleteNotificationValidation
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
const {
  notificationList,
  createNotification,
  getNotification,
  updateNotification,
  deleteNotification
} = require("../controllers/notificationManagement.controller");

const { errHandle } = require("../helpers/index");

const router = Router();
//Notification Template Management
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
//Notification History Management
router.get(
  routes.v1.notificationManagement.list,
  [verifyAdminToken,verifyAdminRole("notificationManagement","VIEW"), notificationListValidation],
  errHandle(notificationList)
);
router.post(
  routes.v1.notificationManagement.create,
  [verifyAdminToken,verifyAdminRole("notificationManagement","ADD"), createNotificationValidation],
  errHandle(createNotification)
);
router.get(
  routes.v1.notificationManagement.get,
  [verifyAdminToken,verifyAdminRole("notificationManagement","VIEW"), getNotificationValidation],
  errHandle(getNotification)
);
router.put(
  routes.v1.notificationManagement.update,
  [verifyAdminToken,verifyAdminRole("notificationManagement","UPDATE"), updateNotificationValidation],
  errHandle(updateNotification)
);
router.delete(
  routes.v1.notificationManagement.delete,
  [verifyAdminToken,verifyAdminRole("notificationManagement","DELETE"), deleteNotificationValidation],
  errHandle(deleteNotification)
);

module.exports = router;
