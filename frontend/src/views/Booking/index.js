import React from 'react';
import { connect } from 'react-redux';
import { setBookings } from 'redux/actions'; // You need to create setBookings action
import BookingRequest from 'services/Requests/Booking'; // You need to create BookingRequest
import { useEffect } from 'react';
import useLoading from 'hooks/useLoading';

const BookingDetail = props => {
  const { setBookings, bookings } = props; // Add bookings to props
  const [loading, withLoading] = useLoading();

  const getAllBookings = async () => { // New function for fetching all bookings
    try {
      const bookings = await withLoading(BookingRequest.getAllBookings()); // Use getAllBookings function
      setBookings(bookings?.data);
      console.log(bookings?.data); // Console log the bookings
    } catch (error) {
      console.log(error?.message);
      console.error(error);
    }
  }

  useEffect(() => {
    if(bookings?.length < 1){ // Fetch bookings if not already fetched
      getAllBookings();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {
        loading
          ? "Loading Bookings"
          : <h4>Check console for bookings data</h4>
      }
    </>
  )
};

const mapStateToProps = ({booking}) => { // Add booking to mapStateToProps
  const { bookings } = booking; // You need to create booking reducer
  return { bookings }
}

const mapDispatchToProps = {
  setBookings // You need to create setBookings action
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingDetail);