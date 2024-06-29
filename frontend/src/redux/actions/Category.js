import { SAVE_CATEGORIES, SAVE_CATEGORY, ADD_CATEGORY, UPDATE_CATEGORY, REMOVE_CATEGORY } from "redux/constants/Category";

export const setCategories = (payload) => {
  return {
    type: SAVE_CATEGORIES,
    payload,
  };
};

export const setCurrentCategory = (payload) => {
  return {
    type: SAVE_CATEGORY,
    payload,
  };
};

export const addCategory = (payload) => {
  return {
    type: ADD_CATEGORY,
    payload,
  };
};

export const updateCategory = (payload) => {
  return {
    type: UPDATE_CATEGORY,
    payload,
  };
};

export const removeCategory = (payload) => {
  return {
    type: REMOVE_CATEGORY,
    payload,
  };
};
