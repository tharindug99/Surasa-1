import { SAVE_CATEGORIES, SAVE_CATEGORY, ADD_CATEGORY, UPDATE_CATEGORY, REMOVE_CATEGORY } from "redux/constants/Category";

const initState = {
  categories: [],
  currentCategory: null,
};

const Category = (state = initState, action) => {
  switch (action.type) {
    case SAVE_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case SAVE_CATEGORY:
      return {
        ...state,
        currentCategory: action.payload,
      };

    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };

    case UPDATE_CATEGORY:
      const updatedCategories = state.categories.map((category) =>
          category.id === action.payload.id ? action.payload : category
      );
      return {
        ...state,
        categories: updatedCategories,
        currentCategory: action.payload.id === state.currentCategory?.id ? action.payload : state.currentCategory,
      };

    case REMOVE_CATEGORY:
      const filteredCategories = state.categories.filter((category) => category.id !== action.payload.id);
      return {
        ...state,
        categories: filteredCategories,
        currentCategory: state.currentCategory?.id === action.payload.id ? null : state.currentCategory,
      };

    default:
      return state;
  }
};

export default Category;
