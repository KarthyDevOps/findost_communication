const mongoose = require("mongoose");
const { InternalServices } = require('../apiServices/index');
const apNotificationSchema = new mongoose.Schema(
  {
    notificationId: {
      type: String
    },
    authorizedPersonId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Success",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const apNotification = mongoose.model(
  "apNotification",
  apNotificationSchema
);
module.exports = { apNotification };
