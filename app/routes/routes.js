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
      list: "/v1/schedule/list",
      create: "/v1/schedule/create",
      get: "/v1/schedule/get",
      update: "/v1/schedule/update",
      delete: "/v1/schedule/delete",
      export: "/v1/schedule/export",
    },
  },
};

module.exports = { routes };
