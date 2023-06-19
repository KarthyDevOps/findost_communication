const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const scheduleSchema = new mongoose.Schema(
  {
    scheduleId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      default: () => {
        const now = Date.now().toString();
        return now.slice(0, 3) + now.slice(10, 13);
      },
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
    },
    token: String,
    otp: String,
  },

  { timestamps: true }
);

const schedule = mongoose.model("schedule", scheduleSchema);

// export default schedule;
module.exports = { schedule };
