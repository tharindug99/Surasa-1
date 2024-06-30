import { SAVE_CONTACT_US, SAVE_CONTACT_USS, ADD_CONTACT_US, UPDATE_CONTACT_US, REMOVE_CONTACT_US } from "redux/constants/ContactUs";

export const setContactUs = (payload) => {
  return {
    type: SAVE_CONTACT_US,
    payload,
  };
};

export const setContactUss = (payload) => {
  return {
    type: SAVE_CONTACT_USS,
    payload,
  };
};

export const addContactUs = (payload) => {
  return {
    type: ADD_CONTACT_US,
    payload,
  };
};

export const updateContactUs = (payload) => {
  return {
    type: UPDATE_CONTACT_US,
    payload,
  };
};

export const removeContactUs = (payload) => {
  return {
    type: REMOVE_CONTACT_US,
    payload,
  };
};