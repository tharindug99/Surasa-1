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

DailyMenuItemRequest.updateADailyMenuItem = (id, dailyMenuItemdata) => {
  return fetch({
    url: `${dailymenuitem}/${id}`,
    method: "put",
    data: dailyMenuItemdata
  });
};

DailyMenuItemRequest.deleteADailyMenuItem = (id) => {
  return fetch({
    url: `${dailymenuitem}/${id}`,
    method: "delete",
  });
};

export default DailyMenuItemRequest;