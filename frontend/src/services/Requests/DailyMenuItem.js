import fetch from "axiosConfig/FetchInterceptor";

const DailyMenuItemRequest = {};
const dailymenuitem = 'dailymenuitems';

DailyMenuItemRequest.addADailyMenuItem = (data) => {
  return fetch({
    url: dailymenuitem,
    method: "post",
    data: data,
  });
};

DailyMenuItemRequest.getAllDailyMenuItem = (params) => {
  return fetch({
    url: dailymenuitem,
    method: "get",
    params: params
  });
};

DailyMenuItemRequest.getADailyMenuItem = (id) => {
  return fetch({
    url: `${dailymenuitem}/${id}`,
    method: "get"
  });
};

DailyMenuItemRequest.updateADailyMenuItem = (params) => {
  return fetch({
    url: dailymenuitem,
    method: "put",
    params: params
  });
};

DailyMenuItemRequest.deleteADailyMenuItem = (params) => {
  return fetch({
    url: dailymenuitem,
    method: "delete",
    params: params
  });
};

export default DailyMenuItemRequest;