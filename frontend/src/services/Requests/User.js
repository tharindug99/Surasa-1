import fetch from "axiosConfig/FetchInterceptor";

const UserRequest = {};
const user = 'users';

UserRequest.addAUser = (data) => {
  return fetch({
    url: user,
    method: "post",
    data: data,
  });
};

UserRequest.getAllUsers = (params) => {
  return fetch({
    url: user,
    method: "get",
    params: params
  });
};

UserRequest.getAUser = (id) => {
  return fetch({
    url: `${user}/${id}`,
    method: "get"
  });
};

UserRequest.updateAUser = (params) => {
  return fetch({
    url: user,
    method: "put",
    params: params
  });
};

UserRequest.deleteAUser = (params) => {
  return fetch({
    url: user,
    method: "delete",
    params: params
  });
};

export default UserRequest;