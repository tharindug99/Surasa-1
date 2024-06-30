import { SAVE_ORDER_ITEMS, SAVE_ORDER_ITEM, ADD_ORDER_ITEM, UPDATE_ORDER_ITEM, REMOVE_ORDER_ITEM } from "redux/constants/OrderItem";

export const setOrderItems = (payload) => {
  return {
    type: SAVE_ORDER_ITEMS,
    payload,
  };
};

export const setCurrentOrderItem = (payload) => {
  return {
    type: SAVE_ORDER_ITEM,
    payload,
  };
};

export const addOrderItem = (payload) => {
  return {
    type: ADD_ORDER_ITEM,
    payload,
  };
};

export const updateOrderItem = (payload) => {
  return {
    type: UPDATE_ORDER_ITEM,
    payload,
  };
};

export const removeOrderItem = (payload) => {
  return {
    type: REMOVE_ORDER_ITEM,
    payload,
  };
};