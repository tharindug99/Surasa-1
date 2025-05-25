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

  // const payload = {
  //   name: dailyMenuItemdata.name || "",
  //   description: dailyMenuItemdata.description || "",
  //   date: dailyMenuItemdata.date || "",
  //   price: dailyMenuItemdata.price || ""
  // };
  // if (dailyMenuItemdata.image) {
  //   payload.append('image', dailyMenuItemdata.image);
  // }

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