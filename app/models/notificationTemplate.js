const mongoose = require("mongoose");
const {InternalServices} = require('../apiServices/index')
const notificationTemplateSchema = new mongoose.Schema(
  {
    notificationTemplateId: {
      type: String
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
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
notificationTemplateSchema.pre('save', async function (next) {
  InternalServices.getSequenceId({ type: "notificationTemplate" });
  var doc = this;
  let counter = await InternalServices.getSequenceId({ type: "notificationTemplate" });
  doc.notificationTemplateId = (counter?.data?.count + 1).toString().padStart(6, '0').toString();;
  next();

});
const NotificationTemplate = mongoose.model("notificationTemplate", notificationTemplateSchema);
module.exports = { NotificationTemplate };
