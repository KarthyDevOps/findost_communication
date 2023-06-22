const mongoose = require("mongoose");
const { InternalServices } = require('../apiServices/index');
const notificationSchema = new mongoose.Schema(
  {
    notificationId: {
      type: String
    },
    userId: {
      type: Array,
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
notificationSchema.pre('save', async function (next) {
  InternalServices.getSequenceId({ type: "notification" });
  var doc = this;
  let counter = await InternalServices.getSequenceId({ type: "notification" });
  doc.notificationId = (counter?.data?.count + 1).toString().padStart(6, '0').toString();;
  next();

});

const Notification = mongoose.model(
  "notification",
  notificationSchema
);
module.exports = { Notification };
