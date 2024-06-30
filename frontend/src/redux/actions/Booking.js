import { SAVE_BOOKINGS, SAVE_BOOKING, ADD_BOOKING, UPDATE_BOOKING, REMOVE_BOOKING } from "redux/constants/Booking";

export const setBookings = (payload) => {
  return {
    type: SAVE_BOOKINGS,
    payload,
  };
};

export const setCurrentBooking = (payload) => {
  return {
    type: SAVE_BOOKING,
    payload,
  };
};

export const addBooking = (payload) => {
  return {
    type: ADD_BOOKING,
    payload,
  };
};

export const updateBooking = (payload) => {
  return {
    type: UPDATE_BOOKING,
    payload,
  };
};

export const removeBooking = (payload) => {
  return {
    type: REMOVE_BOOKING,
    payload,
  };
};