const { NotificationTemplate } = require("../models/notificationTemplate");
const { Notification } = require("../models/notification");
const getNotificationTemplateList = async (params) => {
  let data;
  if (params.all) {
    let filter = {
      isDeleted: false,
    };
    if ([true, false].includes(params?.isActive)) {
      filter.isActive = params.isActive;
    }
    if (params?.search) {
      filter.$or = [
        { title: { $regex: `${params?.search}`, $options: "i" } },
        {
          notificationTemplateId: {
            $regex: `${params?.search}`,
            $options: "i",
          },
        },
      ];
    }
    data = await NotificationTemplate.find(filter);
  } else {
    let filter = {
      isDeleted: false,
    };
    if ([true, false].includes(params?.isActive)) {
      filter.isActive = params.isActive;
    }
    if (params?.search) {
      filter.$or = [
        { title: { $regex: `${params?.search}`, $options: "i" } },
        {
          notificationTemplateId: {
            $regex: `${params?.search}`,
            $options: "i",
          },
        },
      ];
    }
    data = await NotificationTemplate.find(filter)
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
    let filter = {
      isDeleted: false,
    };
    if ([true, false].includes(params?.isActive)) {
      filter.isActive = params.isActive;
    }
    if (params?.search) {
      filter.$or = [
        { title: { $regex: `${params?.search}`, $options: "i" } },
        { notificationId: { $regex: `${params?.search}`, $options: "i" } },
      ];
    }
    data = await Notification.find(filter);
  } else {
    let filter = {
      isDeleted: false,
    };
    if ([true, false].includes(params?.isActive)) {
      filter.isActive = params.isActive;
    }
    if (params?.search) {
      filter.$or = [
        { title: { $regex: `${params?.search}`, $options: "i" } },
        { notificationId: { $regex: `${params?.search}`, $options: "i" } },
      ];
    }
    data = await Notification.find(filter)
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
  getNotificationList,
};
