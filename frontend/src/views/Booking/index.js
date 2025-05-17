import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setBookings } from "redux/actions";
import BookingRequest from "services/Requests/Booking";
import useLoading from "hooks/useLoading";
import CollapsibleTable from "./BookingTableUI"; // Import CollapsibleTable component

const BookingDetail = (props) => {
  const { setBookings, bookings } = props;
  const [loading, withLoading] = useLoading();

  const getAllBookings = async () => {
    try {
      const bookings = await withLoading(BookingRequest.getAllBookings());
      setBookings(bookings?.data);
      console.log(bookings?.data);
    } catch (error) {
      console.log(error?.message);
      console.error(error);
    }
  };

  useEffect(() => {
    if (bookings?.length < 1) {
      getAllBookings();
    }
  }, []);

  return (
    <>
      {loading ? (
        "Loading Bookings"
      ) : (
        <>
          <h4>Bookings Data</h4>
          <CollapsibleTable rows={bookings} />{" "}
          {/* Pass bookings to CollapsibleTable */}
        </>
      )}
    </>
  );
};

const mapStateToProps = ({ booking }) => {
  const { bookings } = booking;
  return { bookings };
};

const mapDispatchToProps = {
  setBookings,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingDetail);
