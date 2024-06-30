import {
  SAVE_DAILY_MENU_ITEM,
  ADD_DAILY_MENU_ITEM,
  UPDATE_DAILY_MENU_ITEM,
  REMOVE_DAILY_MENU_ITEM,
  SAVE_DAILY_MENU_ITEMS
} from "redux/constants/DailyMenuItem";

const initState = {
  dailyMenuItems: [],
  currentDailyMenuItem: null,
};

const DailyMenuItem = (state = initState, action) => {
  switch (action.type) {
    case SAVE_DAILY_MENU_ITEM:
      return {
        ...state,
        dailyMenuItems: action.payload,
      };
      case SAVE_DAILY_MENU_ITEMS:
      return {
        ...state,
        dailyMenuItems: action.payload,
      };

    case ADD_DAILY_MENU_ITEM:
      return {
        ...state,
        dailyMenuItems: [...state.dailyMenuItems, action.payload],
      };

    case UPDATE_DAILY_MENU_ITEM:
      const updatedDailyMenuItems = state.dailyMenuItems.map((item) =>
          item.id === action.payload.id ? action.payload : item
      );
      return {
        ...state,
        dailyMenuItems: updatedDailyMenuItems,
        currentDailyMenuItem: action.payload.id === state.currentDailyMenuItem?.id ? action.payload : state.currentDailyMenuItem,
      };

    case REMOVE_DAILY_MENU_ITEM:
      const filteredDailyMenuItems = state.dailyMenuItems.filter((item) => item.id !== action.payload.id);
      return {
        ...state,
        dailyMenuItems: filteredDailyMenuItems,
        currentDailyMenuItem: state.currentDailyMenuItem?.id === action.payload.id ? null : state.currentDailyMenuItem,
      };

    default:
      return state;
  }
};

export default DailyMenuItem;