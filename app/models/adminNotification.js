const mongoose = require("mongoose");
const adminNotificationSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            trim: true
        },
        isRead: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        extra: {
            type: Object,
        },
        isDeleted: {
            type: String,
            trim: true
        },
        isActive: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true,
    }
);

const adminNotification = mongoose.model(
    "adminNotification",
    adminNotificationSchema
);
module.exports = { adminNotification };
