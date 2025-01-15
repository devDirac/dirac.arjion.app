export const SET_MENU_ROUTES = "@SET_MENU_ROUTES";
export const SET_MENU_ROUTES_DASHBOARD = "@SET_MENU_ROUTES_DASHBOARD";
export const SET_MENU_ROUTES_DASHBOARD_INFO = "@SET_MENU_ROUTES_DASHBOARD_INFO";

export const setMenuRoutes = (value: any) => {
  return {
    type: SET_MENU_ROUTES,
    value
  };
};

export const setMenuRoutesDashboard = (value: any) => {
  return {
    type: SET_MENU_ROUTES_DASHBOARD,
    value
  };
};

export const setMenuRoutesDashboardInfo = (value: any) => {
  return {
    type: SET_MENU_ROUTES_DASHBOARD_INFO,
    value
  };
};
