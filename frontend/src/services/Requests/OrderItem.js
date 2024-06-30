import fetch from "axiosConfig/FetchInterceptor";

const OrderItemRequest = {};
const orderitem = 'orderitems';

OrderItemRequest.addAnOrderItem = (data) => {
  return fetch({
    url: orderitem,
    method: "post",
    data: data,
  });
};

OrderItemRequest.getAllOrderItems = (params) => {
  return fetch({
    url: orderitem,
    method: "get",
    params: params
  });
};

OrderItemRequest.getAnOrderItem = (id) => {
  return fetch({
    url: `${orderitem}/${id}`,
    method: "get"
  });
};

OrderItemRequest.updateAnOrderItem = (params) => {
  return fetch({
    url: orderitem,
    method: "put",
    params: params
  });
};

OrderItemRequest.deleteAnOrderItem = (params) => {
  return fetch({
    url: orderitem,
    method: "delete",
    params: params
  });
};

export default OrderItemRequest;