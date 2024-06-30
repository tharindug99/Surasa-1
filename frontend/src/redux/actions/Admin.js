import { SAVE_ADMINS, SAVE_ADMIN, ADD_ADMIN, UPDATE_ADMIN, REMOVE_ADMIN } from "redux/constants/Admin";

export const setAdmins = (payload) => {
  return {
    type: SAVE_ADMINS,
    payload,
  };
};

export const setCurrentAdmin = (payload) => {
  return {
    type: SAVE_ADMIN,
    payload,
  };
};

export const addAdmin = (payload) => {
  return {
    type: ADD_ADMIN,
    payload,
  };
};

export const updateAdmin = (payload) => {
  return {
    type: UPDATE_ADMIN,
    payload,
  };
};

export const removeAdmin = (payload) => {
  return {
    type: REMOVE_ADMIN,
    payload,
  };
};