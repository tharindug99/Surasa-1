import { SAVE_USER, ADD_USER, UPDATE_USER, REMOVE_USER } from "redux/constants/User";

const initState = {
  users: [],
  currentUser: null,
};

const User = (state = initState, action) => {
  switch (action.type) {
    case SAVE_USER:
      return {
        ...state,
        users: action.payload,
      };

    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case UPDATE_USER:
      const updatedUsers = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
      );
      return {
        ...state,
        users: updatedUsers,
        currentUser: action.payload.id === state.currentUser?.id ? action.payload : state.currentUser,
      };

    case REMOVE_USER:
      const filteredUsers = state.users.filter((user) => user.id !== action.payload.id);
      return {
        ...state,
        users: filteredUsers,
        currentUser: state.currentUser?.id === action.payload.id ? null : state.currentUser,
      };

    default:
      return state;
  }
};

export default User;