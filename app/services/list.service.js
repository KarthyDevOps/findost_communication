const { NotificationTemplate } = require("../models/notificationTemplate");
const { Notification } = require("../models/notification");
const { adminSchedule } = require("../models/adminSchedule");
const { schedule } = require("../models/schedule");
const moment = require("moment-timezone");
const { apNotification } = require("../models/apNotification");
const { adminNotification } = require("../models/adminNotification");

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
    if (params?.authorizedPersonId) {
      console.log("userId", params?.authorizedPersonId);
      filter.authorizedPersonId = params.authorizedPersonId;
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
const getApNotificationList = async (params) => {
  let data;
  if (params.all) {
    let filter = {
      isDeleted: false,
      authorizedPersonId: params?.authorizedPersonId,
    };
    if ([true, false].includes(params?.isActive)) {
      filter.isActive = params.isActive;
    }
    if (params?.isRead && params?.isRead.toLowerCase() == "true")
      filter.isRead = true;
    if (params?.isRead && params?.isRead.toLowerCase() == "false")
      filter.isRead = false;
    if (params?.id) {
      filter._id = params?.id;
    }
    // if(params?.authorizedPersonId){
    //   filter.authorizedPersonId = params.authorizedPersonId;
    // }
    if (params?.search) {
      filter.$or = [
        { title: { $regex: `${params?.search}`, $options: "i" } },
        { notificationId: { $regex: `${params?.search}`, $options: "i" } },
      ];
    }
    data = await apNotification.find(filter);
  } else {
    let filter = {
      isDeleted: false,
    };
    if ([true, false].includes(params?.isActive)) {
      filter.isActive = params.isActive;
    }
    if (params?.isRead && params?.isRead.toLowerCase() == "true")
      filter.isRead = true;
    if (params?.isRead && params?.isRead.toLowerCase() == "false")
      filter.isRead = false;
    if (params?.search) {
      filter.$or = [
        { title: { $regex: `${params?.search}`, $options: "i" } },
        { notificationId: { $regex: `${params?.search}`, $options: "i" } },
      ];
    }
    if (params?.id) {
      filter._id = params?.id;
    }
    if (params?.authorizedPersonId) {
      console.log("userId", params?.authorizedPersonId);
      filter.authorizedPersonId = params.authorizedPersonId;
    }
    data = await apNotification
      .find(filter)
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
const getAdminNotificationList = async (params) => {
  let data;
  if (params.all) {
    let filter = {
      isDeleted: false,
    };
    if ([true, false].includes(params?.isActive)) {
      filter.isActive = params.isActive;
    }
    if (params?.isRead && params?.isRead.toLowerCase() == "true")
      filter.isRead = true;
    if (params?.isRead && params?.isRead.toLowerCase() == "false")
      filter.isRead = false;
    if (params?.id) {
      filter._id = params?.id;
    }
    data = await adminNotification.find(filter);
  } else {
    let filter = {
      isDeleted: false,
    };
    if ([true, false].includes(params?.isActive)) {
      filter.isActive = params.isActive;
    }
    if (params?.isRead && params?.isRead.toLowerCase() == "true")
      filter.isRead = true;
    if (params?.isRead && params?.isRead.toLowerCase() == "false")
      filter.isRead = false;
    data = await adminNotification
      .find(filter)
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

const getAdminScheduleList = async (params) => {
  let data;
  if (params.all) {
    let filter = {
      isDeleted: false,
    };
    if ([true, false].includes(params?.isActive)) {
      filter.isActive = params.isActive;
    }
    if (params.currentDate) {
      filter.date = params?.currentDate;
    }
    if (params?.search) {
      filter.$or = [
        { summary: { $regex: `${params?.search}`, $options: "i" } },
        {
          adminScheduleId: {
            $regex: `${params?.search}`,
            $options: "i",
          },
        },
      ];
    }
    data = await adminSchedule.find(filter);
  } else {
    let filter = {
      isDeleted: false,
    };
    if ([true, false].includes(params?.isActive)) {
      filter.isActive = params.isActive;
    }
    if (params.currentDate) {
      filter.date = params?.currentDate;
    }
    if (params?.search) {
      filter.$or = [
        { summary: { $regex: `${params?.search}`, $options: "i" } },
        {
          adminScheduleId: {
            $regex: `${params?.search}`,
            $options: "i",
          },
        },
      ];
    }
    data = await adminSchedule
      .find(filter)
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

const getMyScheduleList = async (params) => {
  let data;
  if (params.all) {
    let filter = {
      isDeleted: false,
    };
    if ([true, false].includes(params?.isActive)) {
      filter.isActive = params.isActive;
    }
    if (params.filterDate) {
      console.log("filterDate", params?.filterDate);
      filter.date = params.filterDate; //{ $gte: moment(params.filterDate).startOf('day') ,$lte:  moment(params.filterDate).endOf('day') }
    }
    if (params?.search) {
      filter.$or = [
        { title: { $regex: `${params?.search}`, $options: "i" } },
        {
          scheduleId: {
            $regex: `${params?.search}`,
            $options: "i",
          },
        },
      ];
    }
    data = await schedule.find(filter);
  } else {
    let filter = {
      isDeleted: false,
    };
    if ([true, false].includes(params?.isActive)) {
      filter.isActive = params.isActive;
    }
    if (params.filterDate) {
      console.log("filterDate", params?.filterDate);
      filter.date = params.filterDate; //{ $gte: moment(params.filterDate).startOf('day') ,$lte:  moment(params.filterDate).endOf('day') }
    }
    if (params?.search) {
      filter.$or = [
        { title: { $regex: `${params?.search}`, $options: "i" } },
        {
          scheduleId: {
            $regex: `${params?.search}`,
            $options: "i",
          },
        },
      ];
    }
    console.log("schedule.f", JSON.stringify(filter));
    data = await schedule
      .find(filter)
      .skip((params.page - 1) * params.limit)
      .limit(params.limit)
      .sort({ isStared: 1 });
  }
  data = JSON.parse(JSON.stringify(data));

  if (data && data.length) {
    for (let item of data) {
      if (item.startTime) {
        const dateStr = item.startTime;
        const dateTime = moment(dateStr);
        let amTime = dateTime.format("hh:mm A");
        item.meetStartTime = amTime;
        item.meetEndTime = dateTime.add(20, "minutes").format("hh:mm A");
        item.startTime = moment.tz(item.startTime, "Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
        item.endTime = moment.tz(item.endTime, "Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
        console.log('item.startTime', item.startTime)
      }
    }
    return { status: true, data: data };
  } else {
    return { status: false, data: [] };
  }
};

module.exports = {
  getNotificationTemplateList,
  getNotificationList,
  getAdminScheduleList,
  getMyScheduleList,
  getApNotificationList,
  getAdminNotificationList,
};
