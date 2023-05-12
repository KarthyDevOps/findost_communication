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
  
} = require("../validator/validator");

const {
  notificationTemplateList,
  createNotificationTemplate,
  getNotificationTemplate,
  updateNotificationTemplate,
  deleteNotificationTemplate,
  exportNotificationTemplate,
} = require("../controllers/notificationTemplateManagement.controller");

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

module.exports = router;
