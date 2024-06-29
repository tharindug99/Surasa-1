import { ADD_ITEM, REMOVE_ITEM, UPDATE_ITEM } from "redux/constants/Cart";

const initialState = {
  items: [],
  total: 0,
};

const Cart = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + action.payload.price,
      };

    case REMOVE_ITEM:
      const indexToRemove = state.items.findIndex((item) => item.id === action.payload.id);
      if (indexToRemove === -1) return state;
      return {
        ...state,
        items: [...state.items.slice(0, indexToRemove), ...state.items.slice(indexToRemove + 1)],
        total: state.total - action.payload.price,
      };

    case UPDATE_ITEM:
      const indexToUpdate = state.items.findIndex((item) => item.id === action.payload.id);
      if (indexToUpdate === -1) return state;
      const updatedItems = [...state.items];
      const oldPrice = updatedItems[indexToUpdate].price;
      updatedItems[indexToUpdate] = action.payload;
      return {
        ...state,
        items: updatedItems,
        total: state.total - oldPrice + action.payload.price,
      };

    default:
      return state;
  }
};

export default Cart;
