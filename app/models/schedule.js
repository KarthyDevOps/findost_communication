const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const {InternalServices} = require('../apiServices/index')
  
const scheduleSchema = new mongoose.Schema(
  {
    scheduleId: {
      type: String
    },
    eventId: {
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
      type: String,
      required: true,
      trim: true,
    },
    endTime: {
      type: String,
      required: true,
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
    place: {
      type: String,
      trim: true,
    },
    mailType: {
      type: String,
      trim: true,
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
    }
  },

  { timestamps: true }
);

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
