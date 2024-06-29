import { SAVE_BOOKINGS, SAVE_BOOKING, ADD_BOOKING, UPDATE_BOOKING, REMOVE_BOOKING } from "redux/constants/Booking";

const initState = {
  bookings: [],
  currentBooking: null,
};

const Booking = (state = initState, action) => {
  switch (action.type) {
    case SAVE_BOOKINGS:
      return {
        ...state,
        bookings: action.payload,
      };

    case SAVE_BOOKING:
      return {
        ...state,
        currentBooking: action.payload,
      };

    case ADD_BOOKING:
      return {
        ...state,
        bookings: [...state.bookings, action.payload],
      };

    case UPDATE_BOOKING:
      const updatedBookings = state.bookings.map((booking) =>
          booking.id === action.payload.id ? action.payload : booking
      );
      return {
        ...state,
        bookings: updatedBookings,
        currentBooking: action.payload.id === state.currentBooking?.id ? action.payload : state.currentBooking,
      };

    case REMOVE_BOOKING:
      const filteredBookings = state.bookings.filter((booking) => booking.id !== action.payload.id);
      return {
        ...state,
        bookings: filteredBookings,
        currentBooking: state.currentBooking?.id === action.payload.id ? null : state.currentBooking,
      };

    default:
      return state;
  }
};

export default Booking;