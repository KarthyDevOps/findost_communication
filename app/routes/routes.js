const routes = {
  v1: {
    notificationTemplateManagement: {
      list: "/v1/notificationTemplate-management/list",
      create: "/v1/notificationTemplate-management/create",
      get: "/v1/notificationTemplate-management/get",
      update: "/v1/notificationTemplate-management/update",
      delete: "/v1/notificationTemplate-management/delete",
      export: "/v1/notificationTemplate-management/export",
    },
    schedule: {
      create: "/v1/schedule/create",
      access: "/v1/schedule/getAcess",
      redirect: "/v1/schedule/reDirect",
      list: "/v1/schedule/list",
      syncMySchedule: "/v1/schedule/syncMySchedule",
      get: "/v1/schedule/get",
      update: "/v1/schedule/update",
      delete: "/v1/schedule/delete",
      export: "/v1/schedule/export",
      syncCalandar:"/v1/schedule/syncCalandar"
    },
    adminSchedule: {
      list: "/v1/admin/schedule/list",
      create: "/v1/admin/schedule/create",
      get: "/v1/admin/schedule/get",
      update: "/v1/admin/schedule/update",
      delete: "/v1/admin/schedule/delete",
      mobileList: "/v1/mobile/schedule/list",
    },
    notificationManagement: {
      list: "/v1/notification-management/list",
      create: "/v1/notification-management/create",
      get: "/v1/notification-management/get",
      update: "/v1/notification-management/update",
      delete: "/v1/notification-management/delete",
      export: "/v1/notification-management/export",
    },
    apNotificationManagement: {
      list: "/v1/ap-notification-management/list",
      update: "/v1/ap-notification-management/update",
    },
    mail: {
      send:"/v1/Mail/sendMail"
    },
  },
};

module.exports = { routes };
