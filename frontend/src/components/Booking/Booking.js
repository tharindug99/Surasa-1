import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import eventImg from "../../assets/vectors/Events.png";
import BookingRequest from "services/Requests/Booking";

const localizer = momentLocalizer(moment);

function Booking(props) {
  const { bookings } = props;
  console.log(bookings);
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [faculty, setFaculty] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [eventInfo, setEventInfo] = useState(null);
  const [bookedEvents, setBookedEvents] = useState([]);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await BookingRequest.getAllBookings();
        setBookedEvents(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }

    fetchBookings();
  }, []);

  console.log(bookedEvents);

  // Format bookedEvents into the required format for react-big-calendar
  const formattedEvents = bookedEvents.map((event) => ({
    id: event.id, // Ensure each event has a unique ID
    title: event.event_name,
    start: new Date(event.start_time),
    end: new Date(event.end_time),
    faculty: event.faculty,
    createdAt: moment(event.created_at).format("YYYY-MM-DD HH:mm:ss"),
  }));

  const handleBooking = (e) => {
    e.preventDefault();
    // Perform booking logic here, using the collected data
    console.log("Booking Request Sent:", {
      fullName,
      contactNumber,
      email,
      faculty,
      selectedSlot,
    });
    setConfirmationMessage("Booking Request Sent....");
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
      className="bg-cover bg-center min-h-screen h-screen py-28"
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
        className="booking-container px-10 flex flex-col md:flex-row items-center pb-20"
      >
        <div className="w-full md:w-1/2 md:pr-4">
          <Calendar
            className="p-10 bg-white bg-opacity-75 border-2"
            localizer={localizer}
            events={formattedEvents}
            selectable
            min={new Date().setHours(8, 0, 0)} // Set minimum time
            max={new Date().setHours(18, 0, 0)} // Set maximum time
            defaultView="week" // Set default view to week
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
            views={["week", "day"]} // Only show week and day views
            eventPropGetter={eventStyleGetter} // Apply custom styles to events
            onSelectEvent={handleEventClick} // Handle event clicks
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
        <div className="w-full md:w-1/2 md:pl-4 bg-white bg-opacity-75 p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Booking</h2>
          <form onSubmit={handleBooking} className="booking-form">
            <label className="block mb-2">
              Full Name:
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="block w-full px-3 py-2 mt-1 border border-SurasaBrown rounded focus:outline-none focus:ring-2 focus:ring-SurasaYellow"
              />
            </label>
            <label className="block mb-2">
              Contact Number:
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
                <option value="Faculty of Social Sciences and Languages">
                  Faculty of Social Sciences and Languages
                </option>
                <option value="Faculty of Management Studies">
                  Faculty of Management Studies
                </option>
                <option value="Faculty of Agricultural Sciences">
                  Faculty of Agricultural Sciences
                </option>
                <option value="Faculty of Applied Sciences">
                  Faculty of Applied Sciences
                </option>
                <option value="Faculty of Technology">
                  Faculty of Technology
                </option>
                <option value="Faculty of Computing">
                  Faculty of Computing
                </option>
                <option value="Faculty of Geomatics">
                  Faculty of Geomatics
                </option>
              </select>
            </label>
            <button
              type="submit"
              className="px-4 py-2 mt-4 font-bold text-white bg-SurasaBrown rounded hover:bg-SurasaYellow"
            >
              Confirm Booking
            </button>
          </form>
          {confirmationMessage && (
            <p className="mt-4 text-SurasaBrown">{confirmationMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Booking;
