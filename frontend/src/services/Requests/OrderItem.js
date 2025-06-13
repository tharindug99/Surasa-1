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

OrderItemRequest.updateAnOrderItem = (id, orderItemData) => {
  return fetch({
    url: `${orderitem}/${id}`,
    method: "put",
    data: orderItemData // Send complete validated object
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