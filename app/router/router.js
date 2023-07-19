// import { Router } from "express";
const express = require("express");
const Router = express.Router;
const { routes } = require("../routes/routes");
const { verifyToken,verifyAdminRole } = require("../middlewares/authentication");

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

  createAdminScheduleValidation,
  getAdminScheduleValidation,

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
const { addAdminSchedule,getAdminScheduleById,updateAdminSchedule,adminScheduleList,deleteAdminSchedule } = require('../controllers/adminSchedule.controller')
const { addSchedule,
  getScheduleById,
  updateSchedule,
  scheduleList,
  deleteSchedule,
  syncCalendarSchedule
} = require("../controllers/schedule.controller")
const {
  notificationList,
  createNotification,
  getNotification,
  updateNotification,
  deleteNotification
} = require("../controllers/notificationManagement.controller");

const { errHandle } = require("../helpers/index");
const {sendMailWithAttachment} = require("../controllers/mail.controller");

const router = Router();

//Notification Template Management
router.get(
  routes.v1.notificationTemplateManagement.list,
  [verifyToken(["ADMIN"]),verifyAdminRole("notificationManagement","VIEW"), notificationTemplateListValidation],
  errHandle(notificationTemplateList)
);
router.post(
  routes.v1.notificationTemplateManagement.create,
  [verifyToken(["ADMIN"]),verifyAdminRole("notificationManagement","ADD"), createNotificationTemplateValidation],
  errHandle(createNotificationTemplate)
);
router.get(
  routes.v1.notificationTemplateManagement.get,
  [verifyToken(["ADMIN"]),verifyAdminRole("notificationManagement","VIEW"), getNotificationTemplateValidation],
  errHandle(getNotificationTemplate)
);
router.put(
  routes.v1.notificationTemplateManagement.update,
  [verifyToken(["ADMIN"]),verifyAdminRole("notificationManagement","UPDATE"), updateNotificationTemplateValidation],
  errHandle(updateNotificationTemplate)
);
router.delete(
  routes.v1.notificationTemplateManagement.delete,
  [verifyToken(["ADMIN"]),verifyAdminRole("notificationManagement","DELETE"), deleteNotificationTemplateValidation],
  errHandle(deleteNotificationTemplate)
);


//schedule module
router.post(routes.v1.schedule.create,[verifyToken(["AP"])],errHandle(addSchedule))
router.post(routes.v1.schedule.syncCalandar,[verifyToken(["AP"])],errHandle(syncCalendarSchedule))
router.get(routes.v1.schedule.list,[verifyToken(["AP"]),scheduleListValidation],scheduleList)
router.put(routes.v1.schedule.update,[updateScheduleValidation],updateSchedule)
router.delete(routes.v1.schedule.delete,[deleteScheduleValidation],deleteSchedule)
router.get(routes.v1.schedule.get,[getScheduleValidation],getScheduleById)


// Admin Schedule Module
router.post(routes.v1.adminSchedule.create,[verifyToken(["ADMIN"]),verifyAdminRole("scheduleManagement","ADD"),createAdminScheduleValidation],errHandle(addAdminSchedule))
router.get(routes.v1.adminSchedule.list,[verifyToken(["ADMIN"]),verifyAdminRole("scheduleManagement","VIEW"),scheduleListValidation],errHandle(adminScheduleList))
router.put(routes.v1.adminSchedule.update,[verifyToken(["ADMIN"]),verifyAdminRole("scheduleManagement","UPDATE"),updateScheduleValidation],errHandle(updateAdminSchedule))
router.delete(routes.v1.adminSchedule.delete,[verifyToken(["ADMIN"]),verifyAdminRole("scheduleManagement","DELETE"),deleteScheduleValidation],errHandle(deleteAdminSchedule))
router.get(routes.v1.adminSchedule.get,[verifyToken(["ADMIN"]),verifyAdminRole("scheduleManagement","VIEW"),getAdminScheduleValidation],errHandle(getAdminScheduleById))

//show user to admin  created schedule
router.get(routes.v1.adminSchedule.mobileList,errHandle(adminScheduleList))

//Notification History Management
router.get(
  routes.v1.notificationManagement.list,
  [verifyToken(["ADMIN"]),verifyAdminRole("notificationManagement","VIEW"), notificationListValidation],
  errHandle(notificationList)
);
router.post(
  routes.v1.notificationManagement.create,
  [verifyToken(["ADMIN"]),verifyAdminRole("notificationManagement","ADD"), createNotificationValidation],
  errHandle(createNotification)
);
router.get(
  routes.v1.notificationManagement.get,
  [verifyToken(["ADMIN"]),verifyAdminRole("notificationManagement","VIEW"), getNotificationValidation],
  errHandle(getNotification)
);
router.put(
  routes.v1.notificationManagement.update,
  [verifyToken(["ADMIN"]),verifyAdminRole("notificationManagement","UPDATE"), updateNotificationValidation],
  errHandle(updateNotification)
);
router.delete(
  routes.v1.notificationManagement.delete,
  [verifyToken(["ADMIN"]),verifyAdminRole("notificationManagement","DELETE"), deleteNotificationValidation],
  errHandle(deleteNotification)
);

///send mail

router.post("/v1/sendMail",sendMailWithAttachment)

module.exports = router;
