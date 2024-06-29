import { SAVE_ORDER_ITEM, ADD_ORDER_ITEM, UPDATE_ORDER_ITEM, REMOVE_ORDER_ITEM } from "redux/constants/OrderItem";

const initState = {
  orderItems: [],
  currentOrderItem: null,
};

const OrderItem = (state = initState, action) => {
  switch (action.type) {
    case SAVE_ORDER_ITEM:
      return {
        ...state,
        orderItems: action.payload,
      };

    case ADD_ORDER_ITEM:
      return {
        ...state,
        orderItems: [...state.orderItems, action.payload],
      };

    case UPDATE_ORDER_ITEM:
      const updatedOrderItems = state.orderItems.map((item) =>
          item.id === action.payload.id ? action.payload : item
      );
      return {
        ...state,
        orderItems: updatedOrderItems,
        currentOrderItem: action.payload.id === state.currentOrderItem?.id ? action.payload : state.currentOrderItem,
      };

    case REMOVE_ORDER_ITEM:
      const filteredOrderItems = state.orderItems.filter((item) => item.id !== action.payload.id);
      return {
        ...state,
        orderItems: filteredOrderItems,
        currentOrderItem: state.currentOrderItem?.id === action.payload.id ? null : state.currentOrderItem,
      };

    default:
      return state;
  }
};

export default OrderItem;