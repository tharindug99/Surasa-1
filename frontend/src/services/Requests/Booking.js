import fetch from "axiosConfig/FetchInterceptor";

const BookingRequest = {};
const booking = 'bookings';

BookingRequest.addABooking = (data) => {
  return fetch({
    url: booking,
    method: "post",
    data: data,
  });
};

BookingRequest.getAllBookings = (params) => {
  return fetch({
    url: booking,
    method: "get",
    params: params
  });
};

BookingRequest.getABooking = (id) => {
  return fetch({
    url: `${booking}/${id}`,
    method: "get"
  });
};

BookingRequest.updateABooking = (params) => {
  return fetch({
    url: booking,
    method: "put",
    params: params
  });
};

BookingRequest.deleteABooking = (params) => {
  return fetch({
    url: booking,
    method: "delete",
    params: params
  });
};

export default BookingRequest;