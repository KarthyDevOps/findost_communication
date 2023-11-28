const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const {InternalServices} = require('../apiServices/index')
const { getImageURL } = require("../utils/s3Utils")
const {MAIL_TYPE} = require('../constants/index')
const scheduleSchema = new mongoose.Schema(
  {
    scheduleId: {
      type: String,
    },
    type: {
      type: String,
      trim: true,
      enum: ["MY SCHEDULE", "FINDOC", "ECONOMICS", "CORPORATE"],
      default: "MY SCHEDULE",
    },
    eventId: {
      type: String,
      trim: true,
    },
    apId: {
      type: String,
      trim: true,
    },
    summary: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    startTime: {
      type: Date,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      trim: true,
    },
    endTime: {
      type: Date,
      required: false,
      trim: true,
    },
    agenda: {
      type: String,
      trim: true,
    },
    speakerName: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    place: {
      type: String,
      trim: true,
    },
    mailType: {
      type: String,
      trim: true,
      enum: [MAIL_TYPE.GOOGLE, MAIL_TYPE.MICROSOFT],
    },
    isGoogleSynced: {
      type: Boolean,
      default: false,
    },
    isMicrosoftSynced: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: false,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      required: false,
    },
  },

  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);
scheduleSchema.virtual('imageUrlS3').get(function () {
  return this.imageUrl ? getImageURL(this.imageUrl) : null;
})

scheduleSchema.pre('save', async function (next) {
  InternalServices.getSequenceId({ type: "schedule" });
  var doc = this;
  let counter = await InternalServices.getSequenceId({ type: "schedule" });
  doc.scheduleId = (counter?.data?.count + 1).toString().padStart(6, '0').toString();;
  next();

});

const schedule = mongoose.model("schedule", scheduleSchema);

// export default schedule;
module.exports = { schedule };
