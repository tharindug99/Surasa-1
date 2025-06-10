import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import eventImg from "../../assets/vectors/Events.png";
import BookingRequest from "services/Requests/Booking";
import Toaster from "../../components/Toaster/Toaster";

const localizer = momentLocalizer(moment);

function Booking(props) {
  const { bookings } = props;
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [faculty, setFaculty] = useState("");
  const [status, setStatus] = useState("Pending");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [eventName, setEventName] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [eventInfo, setEventInfo] = useState(null);
  const [bookedEvents, setBookedEvents] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // Added submitting state
  const [showToaster, setShowToaster] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");
  const [toasterType, setToasterType] = useState("success");

  //Fetch The bookings
  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await BookingRequest.getAllBookings();

        const confirmedBookings = response.data.filter(
          booking => booking.status === "Confirmed"
        );
        console.log("Confirmed bookings", confirmedBookings);

        setBookedEvents(confirmedBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }
    fetchBookings();
  }, []);

  // Format bookedEvents into the required format for react-big-calendar
  const formattedEvents = bookedEvents.map((event) => ({
    id: event.id,
    start: new Date(event.start_time),
    end: new Date(event.end_time),
  }));

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!selectedSlot) {
      setConfirmationMessage("Please select a time slot first.");
      return;
    }

    setIsSubmitting(true); // Start submission
    setConfirmationMessage("Processing your booking...");

    try {
      // FIX: Convert dates to MySQL-compatible format
      const startTime = moment(selectedSlot.start).format("YYYY-MM-DD HH:mm:ss");
      const endTime = moment(selectedSlot.end).format("YYYY-MM-DD HH:mm:ss");

      const bookingData = {
        name: fullName,
        phone_num: contactNumber,
        email,
        faculty,
        status,
        event_name: eventName,
        start_time: startTime, // Use formatted time
        end_time: endTime,     // Use formatted time
      };

      await BookingRequest.addABooking(bookingData);

      setConfirmationMessage("Booking confirmed successfully!");
      setToasterMessage("Your message has been sent successfully!");
      setToasterType("success");
      setShowToaster(true);
      // Reset form fields
      setFullName("");
      setContactNumber("");
      setEmail("");
      setFaculty("");
      setEventName("");
      setSelectedSlot(null);

      // Refresh bookings
      const response = await BookingRequest.getAllBookings();
      setBookedEvents(response.data);
    } catch (error) {
      console.error("Booking failed:", error);
      setConfirmationMessage("Booking failed. Please try again.");
      setToasterMessage("Failed to send message. Please try again.");
      setToasterType("error");
      setShowToaster(true);
    } finally {
      setIsSubmitting(false); // End submission
    }
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    let style = {
      backgroundColor: "#F0C903",
      borderRadius: "0px",
      opacity: 0.8,
      color: "black",
      border: "0px",
      display: "block",
    };
    return {
      style: style,
    };
  };

  const handleEventClick = (event) => {
    setEventInfo(event);
  };

  const isSlotBooked = (start, end) => {
    return bookedEvents.some(
      (event) =>
        (start >= new Date(event.start_time) &&
          start < new Date(event.end_time)) ||
        (end > new Date(event.start_time) && end <= new Date(event.end_time)) ||
        (start <= new Date(event.start_time) && end >= new Date(event.end_time))
    );
  };

  return (
    <div
      className="bg-cover bg-center my-10"
      style={{ backgroundImage: `url(${eventImg})` }}
    >
      <div className="text-center p-6 items-center justify-center pb-20">
        <h2 className="text-yellow-800 text-5xl font-semibold">
          Need to Book Surasa?
        </h2>
        <p className="text-gray-700 text-lg">Birthday? Event? Fundraiser?</p>
      </div>

      <div
        id="booking"
        className="booking-container flex flex-col md:flex-row items-center pb-20 min-h-screen"
      >
        <div className="w-full md:w-1/2 md:pr-4">
          <Calendar
            className="p-10 bg-white bg-opacity-75 border-2"
            localizer={localizer}
            // events={formattedEvents}
            selectable
            min={new Date().setHours(8, 0, 0)}
            max={new Date().setHours(18, 0, 0)}
            defaultView="week"
            onSelectSlot={(slotInfo) => {
              if (!isSlotBooked(slotInfo.start, slotInfo.end)) {
                setSelectedSlot(slotInfo);
                setConfirmationMessage(
                  "Confirm booking for " +
                  moment(slotInfo.start).format("LT") +
                  " - " +
                  moment(slotInfo.end).format("LT") +
                  "?"
                );
              } else {
                setConfirmationMessage("This slot is already booked.");
              }
            }}
            views={["week", "day"]}
            eventPropGetter={eventStyleGetter}
            onSelectEvent={handleEventClick}
            components={{
              week: {
                header: ({ date, label }) => {
                  return <div style={{ height: "50px" }}>{label}</div>;
                },
                row: () => {
                  return null;
                },
              },
              day: ({ date, children }) => {
                return (
                  <div style={{ backgroundColor: "blue", height: "100%" }}>
                    {children}
                  </div>
                );
              },
            }}
          />
        </div>

        <div className="w-full md:w-1/2 md:pl-4 bg-white bg-opacity-75 p-4 rounded-lg ">
          <h2 className="text-2xl font-semibold mb-4">Booking</h2>
          <form onSubmit={handleBooking} className="booking-form">
            <label className="block mb-2">
              Event Name
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                required
                className="block w-full px-3 py-2 mt-1 border border-SurasaBrown rounded focus:outline-none focus:ring-2 focus:ring-SurasaYellow"
              />
            </label>
            <label className="block mb-2">
              Start Date & Time:
              <input
                type="datetime-local"
                onChange={(e) =>
                  setSelectedSlot((prev) => ({
                    ...prev,
                    start: new Date(e.target.value),
                  }))
                }
                className="block w-full px-3 py-2 mt-1 border border-SurasaBrown rounded focus:outline-none focus:ring-2 focus:ring-SurasaYellow"
              />
            </label>
            <label className="block mb-2">
              End Date & Time:
              <input
                type="datetime-local"
                onChange={(e) =>
                  setSelectedSlot((prev) => ({
                    ...prev,
                    end: new Date(e.target.value),
                  }))
                }
                className="block w-full px-3 py-2 mt-1 border border-SurasaBrown rounded focus:outline-none focus:ring-2 focus:ring-SurasaYellow"
              />
            </label>
            <label className="block mb-2">
              Full Name
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="block w-full px-3 py-2 mt-1 border border-SurasaBrown rounded focus:outline-none focus:ring-2 focus:ring-SurasaYellow"
              />
            </label>
            <label className="block mb-2">
              Contact Number
              <input
                type="tel"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
                className="block w-full px-3 py-2 mt-1 border border-SurasaBrown rounded focus:outline-none focus:ring-2 focus:ring-SurasaYellow"
              />
            </label>
            <label className="block mb-2">
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full px-3 py-2 mt-1 border border-SurasaBrown rounded focus:outline-none focus:ring-2 focus:ring-SurasaYellow"
              />
            </label>
            <label className="block mb-2">
              Faculty Details:
              <select
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                required
                className="block w-full px-3 py-2 mt-1 border border-SurasaBrown rounded focus:outline-none focus:ring-2 focus:ring-SurasaYellow"
              >
                <option value="" disabled>
                  Select Faculty
                </option>
                <option value="Social Sciences & Languages">
                  Faculty of Social Sciences and Languages
                </option>
                <option value="Management Studies">
                  Faculty of Management Studies
                </option>
                <option value="Agricultural Sciences">
                  Faculty of Agricultural Sciences
                </option>
                <option value="Faculty of Applied Sciences">
                  Faculty of Applied Sciences
                </option>
                <option value="Technology">
                  Faculty of Technology
                </option>
                <option value="Computing">
                  Faculty of Computing
                </option>
                <option value="Geomatics">
                  Faculty of Geomatics
                </option>
              </select>
            </label>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 mt-4 font-bold text-white bg-SurasaBrown rounded hover:bg-SurasaYellow ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              {isSubmitting ? "Processing..." : "Confirm Booking"}
            </button>
          </form>
          {confirmationMessage && (
            <p className="mt-4 text-SurasaBrown">{confirmationMessage}</p>
          )}
        </div>
      </div>
      {showToaster && (
        <Toaster
          message={toasterMessage}
          type={toasterType}
          onClose={() => setShowToaster(false)}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9999
          }}
        />
      )}
    </div>
  );
}

export default Booking;