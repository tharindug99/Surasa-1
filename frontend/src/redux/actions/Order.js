import { SAVE_ORDERS, SAVE_ORDER, ADD_ORDER, UPDATE_ORDER, REMOVE_ORDER } from "redux/constants/Order";

export const setOrders = (payload) => {
  return {
    type: SAVE_ORDERS,
    payload,
  };
};

export const setCurrentOrder = (payload) => {
  return {
    type: SAVE_ORDER,
    payload,
  };
};

export const addOrder = (payload) => {
  return {
    type: ADD_ORDER,
    payload,
  };
};

export const updateOrder = (payload) => {
  return {
    type: UPDATE_ORDER,
    payload,
  };
};

export const removeOrder = (payload) => {
  return {
    type: REMOVE_ORDER,
    payload,
  };
};