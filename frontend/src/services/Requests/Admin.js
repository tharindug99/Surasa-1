import fetch from "axiosConfig/FetchInterceptor";

const AdminRequest = {};
const admin = 'admins';

AdminRequest.addAnAdmin = (data) => {
  return fetch({
    url: admin,
    method: "post",
    data: data,
  });
};

AdminRequest.getAllAdmins = (params) => {
  return fetch({
    url: admin,
    method: "get",
    params: params
  });
};

AdminRequest.getAnAdmin = (id) => {
  return fetch({
    url: `${admin}/${id}`,
    method: "get"
  });
};

AdminRequest.updateAnAdmin = (params) => {
  return fetch({
    url: admin,
    method: "put",
    params: params
  });
};

AdminRequest.deleteAnAdmin = (params) => {
  return fetch({
    url: admin,
    method: "delete",
    params: params
  });
};

AdminRequest.loginAdmin = (data) => {
  return fetch({
    url: 'admin/login', // Update with your actual admin login endpoint
    method: "post",
    data: data,
  });
};

AdminRequest.logoutAdmin = (params) => {
  return fetch({
    url: '/admin/logout',
    method: "post",
    params: params
  })
}

export default AdminRequest;