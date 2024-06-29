import { SAVE_ADMINS, SAVE_ADMIN, ADD_ADMIN, UPDATE_ADMIN, REMOVE_ADMIN } from "redux/constants/Admin";

const initState = {
  admins: [],
  currentAdmin: null,
};

const Admin = (state = initState, action) => {
  switch (action.type) {
    case SAVE_ADMINS:
      return {
        ...state,
        admins: action.payload,
      };

    case SAVE_ADMIN:
      return {
        ...state,
        currentAdmin: action.payload,
      };

    case ADD_ADMIN:
      return {
        ...state,
        admins: [...state.admins, action.payload],
      };

    case UPDATE_ADMIN:
      const updatedAdmins = state.admins.map((admin) =>
          admin.id === action.payload.id ? action.payload : admin
      );
      return {
        ...state,
        admins: updatedAdmins,
        currentAdmin: action.payload.id === state.currentAdmin?.id ? action.payload : state.currentAdmin,
      };

    case REMOVE_ADMIN:
      const filteredAdmins = state.admins.filter((admin) => admin.id !== action.payload.id);
      return {
        ...state,
        admins: filteredAdmins,
        currentAdmin: state.currentAdmin?.id === action.payload.id ? null : state.currentAdmin,
      };

    default:
      return state;
  }
};

export default Admin;