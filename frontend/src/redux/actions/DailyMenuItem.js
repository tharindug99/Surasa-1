import { SAVE_DAILY_MENU_ITEMS, SAVE_DAILY_MENU_ITEM, ADD_DAILY_MENU_ITEM, UPDATE_DAILY_MENU_ITEM, REMOVE_DAILY_MENU_ITEM } from "redux/constants/DailyMenuItem";

export const setDailyMenuItems = (payload) => {
  return {
    type: SAVE_DAILY_MENU_ITEMS,
    payload,
  };
};

export const setCurrentDailyMenuItem = (payload) => {
  return {
    type: SAVE_DAILY_MENU_ITEM,
    payload,
  };
};

export const addDailyMenuItem = (payload) => {
  return {
    type: ADD_DAILY_MENU_ITEM,
    payload,
  };
};

export const updateDailyMenuItem = (payload) => {
  return {
    type: UPDATE_DAILY_MENU_ITEM,
    payload,
  };
};

export const removeDailyMenuItem = (payload) => {
  return {
    type: REMOVE_DAILY_MENU_ITEM,
    payload,
  };
};