const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const {InternalServices} = require('../apiServices/index')
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanGetters = require('mongoose-lean-getters');
const { getImageURL } = require("../utils/s3Utils")
const adminScheduleSchema = new mongoose.Schema(
  {
    adminScheduleId: {
      type: String
    },
    summary: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    date: {
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
    imageUrl: {
      type: String,
      trim: true,
    },
    isStared: {
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

  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: {
      virtuals: true,
      getters: true
    }
  }
);

adminScheduleSchema.plugin(mongooseLeanVirtuals);
adminScheduleSchema.plugin(mongooseLeanGetters);

adminScheduleSchema.virtual('imageUrlS3').get(function () {
  return this.imageUrl ? getImageURL(this.imageUrl) : null;
})

adminScheduleSchema.pre('save', async function (next) {
  InternalServices.getSequenceId({ type: "adminSchedule" });
  var doc = this;
  let counter = await InternalServices.getSequenceId({ type: "adminSchedule" });
  doc.adminScheduleId = (counter?.data?.count + 1).toString().padStart(6, '0').toString();;
  next();

});

const adminSchedule = mongoose.model("adminSchedule", adminScheduleSchema);

// export default schedule;
module.exports = { adminSchedule };
