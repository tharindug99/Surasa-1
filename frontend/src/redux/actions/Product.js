import { SAVE_PRODUCTS, SAVE_PRODUCT, ADD_PRODUCT, UPDATE_PRODUCT, REMOVE_PRODUCT } from "redux/constants/Product";

export const setProducts = (payload) => {
  return {
    type: SAVE_PRODUCTS,
    payload,
  };
};

export const setCurrentProduct = (payload) => {
  return {
    type: SAVE_PRODUCT,
    payload,
  };
};

export const addProduct = (payload) => {
  return {
    type: ADD_PRODUCT,
    payload,
  };
};

export const updateProduct = (payload) => {
  return {
    type: UPDATE_PRODUCT,
    payload,
  };
};

export const removeProduct = (payload) => {
  return {
    type: REMOVE_PRODUCT,
    payload,
  };
};
