import fetch from "axiosConfig/FetchInterceptor";

const OrderRequest = {};
const order = 'orders';

OrderRequest.addAnOrder = (data) => {
  return fetch({
    url: order,
    method: "post",
    data: data,
  });
};

OrderRequest.getAllOrders = (params) => {
  return fetch({
    url: order,
    method: "get",
    params: params
  });
};

OrderRequest.getAnOrder = (id) => {
  return fetch({
    url: `${order}/${id}`,
    method: "get"
  });
};

OrderRequest.updateAnOrder = (params) => {
  return fetch({
    url: order,
    method: "put",
    params: params
  });
};

OrderRequest.deleteAnOrder = (params) => {
  return fetch({
    url: order,
    method: "delete",
    params: params
  });
};

export default OrderRequest;