import { ADD_ITEM, REMOVE_ITEM, UPDATE_ITEM, READ_ITEMS } from "redux/constants/Cart";

export const addItem = (payload) => {
  return {
    type: ADD_ITEM,
    payload,
  };
};

export const removeItem = (payload) => {
  return {
    type: REMOVE_ITEM,
    payload,
  };
};

export const updateItem = (payload) => {
  return {
    type: UPDATE_ITEM,
    payload,
  };
};


