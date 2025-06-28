import React from 'react';
import { connect } from 'react-redux';
import { setBookings } from 'redux/actions';
import BookingRequest from 'services/Requests/Booking';
import { useEffect } from 'react';
import useLoading from 'hooks/useLoading';
// import BookingStatistics from 'components/BookingMenu/BookingStatistics';
import PendingBookingsTable from '../../components/Booking/Tables/PendingBookings';
import ConfirmedBookingsTable from '../../components/Booking/Tables/ConfirmedBookings';
import CompletedBookingsTable from '../../components/Booking/Tables/CompletedBookings';
import RejectedBookingsTable from '../../components/Booking/Tables/RejectedBookings';

const Booking = props => {
  const { setBookings, bookings = [] } = props;
  const [loading, withLoading] = useLoading();
  const [bookingCount, setBookingCount] = React.useState(0);
  const [pendingCount, setPendingCount] = React.useState(0);
  const [confirmedCount, setConfirmedCount] = React.useState(0);
  const [completedCount, setCompletedCount] = React.useState(0);
  const [rejectedCount, setRejectedCount] = React.useState(0);

  const getAllBookings = async () => {
    try {
      const bookingsRes = await withLoading(BookingRequest.getAllBookings());
      const bookingsData = bookingsRes?.data || [];

      console.log("Bookings data:", bookingsData);

      // Update Redux
      setBookings(bookingsData);

      // Update counts
      setBookingCount(bookingsData.length);
      setPendingCount(bookingsData.filter(booking => booking.status === 'Pending').length);
      setConfirmedCount(bookingsData.filter(booking => booking.status === 'Confirmed').length);
      setCompletedCount(bookingsData.filter(booking => booking.status === 'Completed').length);
      setRejectedCount(bookingsData.filter(booking => booking.status === 'Rejected').length);

      console.log("Redux state updated with bookings:", bookingsData);

    } catch (error) {
      console.error('Error fetching bookings:', error?.message);
      // Reset counts on error
      setBookingCount(0);
      setPendingCount(0);
      setConfirmedCount(0);
      setCompletedCount(0);
      setRejectedCount(0);
    }
  };

  useEffect(() => {
    // Fetch if bookings are empty or not loaded
    if (!bookings || bookings.length === 0) {
      getAllBookings();
    } else {
      // Update counts from existing bookings
      setBookingCount(bookings.length);
      setPendingCount(bookings.filter(b => b.status === 'Pending').length);
      setConfirmedCount(bookings.filter(b => b.status === 'Confirmed').length);
      setCompletedCount(bookings.filter(b => b.status === 'Completed').length);
      setRejectedCount(bookings.filter(b => b.status === 'Rejected').length);
    }
  }, []);

  return (
    <>

      {/* <BookingStatistics
        bookingCount={bookingCount}
        pendingCount={pendingCount}
        confirmedCount={confirmedCount}
        completedCount={completedCount}
        rejectedCount={rejectedCount}
      /> */}

      {/* Pending Bookings */}
      <div className="flex justify-between items-center mt-6">
        <h2 className="text-xl font-semibold">Pending Bookings</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={getAllBookings}
        >
          Refresh Bookings
        </button>
      </div>
      <div className="flex flex-col w-full mt-6">
        <div className="overflow-x-auto">
          <PendingBookingsTable
            bookings={bookings.filter(booking => booking.status === 'Pending')}
          />
        </div>
      </div>

      {/* Confirmed Bookings */}
      <div className="flex justify-between items-center mt-6">
        <h2 className="text-xl font-semibold">Confirmed Bookings</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={getAllBookings}
        >
          Refresh Bookings
        </button>
      </div>
      <div className="flex flex-col w-full mt-6">
        <div className="overflow-x-auto">
          <ConfirmedBookingsTable
            bookings={bookings.filter(booking => booking.status === 'Confirmed')}
          />
        </div>
      </div>

      {/* Completed Bookings */}
      <div className="flex justify-between items-center mt-6">
        <h2 className="text-xl font-semibold">Completed Bookings</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={getAllBookings}
        >
          Refresh Bookings
        </button>
      </div>
      <div className="flex flex-col w-full mt-6">
        <div className="overflow-x-auto">
          <CompletedBookingsTable
            bookings={bookings.filter(booking => booking.status === 'Completed')}
          />
        </div>
      </div>

      {/* Rejected Bookings */}
      <div className="flex justify-between items-center mt-6">
        <h2 className="text-xl font-semibold">Rejected Bookings</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={getAllBookings}
        >
          Refresh Bookings
        </button>
      </div>
      <div className="flex flex-col w-full mt-6">
        <div className="overflow-x-auto">
          <RejectedBookingsTable
            bookings={bookings.filter(booking => booking.status === 'Rejected')}
          />
        </div>
      </div>
    </>
  )
};

const mapStateToProps = (state) => {
  return {
    bookings: state.booking.bookings || []
  };
};

const mapDispatchToProps = {
  setBookings
};

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
