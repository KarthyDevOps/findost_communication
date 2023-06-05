const { NotificationTemplate } = require("../models/notificationTemplate");
const { Notification } = require("../models/notification");


const getNotificationTemplateList = async (params) => {
  let data;
  if (params.all) {
    if (params?.search) {
      data = await NotificationTemplate.find({
        isDeleted: false,
        $or: [
          { title: { $regex: `${params?.search}`, $options: "i" } },
          { content: { $regex: `${params?.search}`, $options: "i" } },
          { type: { $regex: `${params?.search}`, $options: "i" } },
        ],
      }).sort({ createdAt: -1 });
    } else {
      data = await NotificationTemplate.find({
        isDeleted: false,
      });
    }
  } else if (params?.search) {
    data = await NotificationTemplate.find({
      isDeleted: false,
      $or: [
        { title: { $regex: `${params?.search}`, $options: "i" } },
        { content: { $regex: `${params?.search}`, $options: "i" } },
        { type: { $regex: `${params?.search}`, $options: "i" } },
      ],
    })
      .skip((params.page - 1) * params.limit)
      .limit(params.limit)
      .sort({ createdAt: -1 });
  } else {
    data = await NotificationTemplate.find({
      isDeleted: false,
    })
      .skip((params.page - 1) * params.limit)
      .limit(params.limit)
      .sort({ createdAt: -1 });
  }
  if (data && data.length) {
    return { status: true, data: data };
  } else {
    return { status: false, data: [] };
  }
};
const getNotificationList = async (params) => {
  let data;
  if (params.all) {
    if (params?.search) {
      data = await Notification.find({
        isDeleted: false,
        $or: [
          { title: { $regex: `${params?.search}`, $options: "i" } },
          { content: { $regex: `${params?.search}`, $options: "i" } },
          { type: { $regex: `${params?.search}`, $options: "i" } },
        ],
      }).sort({ createdAt: -1 });
    } else {
      data = await Notification.find({
        isDeleted: false,
      });
    }
  } else if (params?.search) {
    data = await Notification.find({
      isDeleted: false,
      $or: [
        { title: { $regex: `${params?.search}`, $options: "i" } },
        { content: { $regex: `${params?.search}`, $options: "i" } },
        { type: { $regex: `${params?.search}`, $options: "i" } },
      ],
    })
      .skip((params.page - 1) * params.limit)
      .limit(params.limit)
      .sort({ createdAt: -1 });
  } else {
    data = await Notification.find({
      isDeleted: false,
    })
      .skip((params.page - 1) * params.limit)
      .limit(params.limit)
      .sort({ createdAt: -1 });
  }
  if (data && data.length) {
    return { status: true, data: data };
  } else {
    return { status: false, data: [] };
  }
};
module.exports = {
  getNotificationTemplateList,
};
