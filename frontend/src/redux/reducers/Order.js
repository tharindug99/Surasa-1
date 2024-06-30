import {SAVE_ORDER, ADD_ORDER, UPDATE_ORDER, REMOVE_ORDER, SAVE_ORDERS} from "redux/constants/Order";

const initState = {
  orders: [],
  currentOrder: null,
};

const Order = (state = initState, action) => {
  switch (action.type) {
    case SAVE_ORDER:
      return {
        ...state,
        orders: action.payload,
      };
      case SAVE_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };

    case ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };

    case UPDATE_ORDER:
      const updatedOrders = state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order
      );
      return {
        ...state,
        orders: updatedOrders,
        currentOrder: action.payload.id === state.currentOrder?.id ? action.payload : state.currentOrder,
      };

    case REMOVE_ORDER:
      const filteredOrders = state.orders.filter((order) => order.id !== action.payload.id);
      return {
        ...state,
        orders: filteredOrders,
        currentOrder: state.currentOrder?.id === action.payload.id ? null : state.currentOrder,
      };

    default:
      return state;
  }
};

export default Order;