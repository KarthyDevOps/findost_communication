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
  },
};

module.exports = { routes };
