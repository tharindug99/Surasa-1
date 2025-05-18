import { SAVE_USERS, SAVE_USER, ADD_USER, UPDATE_USER, REMOVE_USER, LOGIN_USER, LOGOUT_USER } from "redux/constants/User";

export const setUsers = (payload) => {
  return {
    type: SAVE_USERS,
    payload,
  };
};

export const setCurrentUser = (payload) => {
  return {
    type: SAVE_USER,
    payload,
  };
};

export const addUser = (payload) => {
  return {
    type: ADD_USER,
    payload,
  };
};

export const updateUser = (payload) => {
  return {
    type: UPDATE_USER,
    payload,
  };
};

export const removeUser = (payload) => {
  return {
    type: REMOVE_USER,
    payload,
  };
};

export const loginUser = (payload) => ({
  type: LOGIN_USER,
  payload,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const updateUserLoyaltyPoints = (user, points, operationType) => ({
  type: operationType,
  payload: { user, points }
});