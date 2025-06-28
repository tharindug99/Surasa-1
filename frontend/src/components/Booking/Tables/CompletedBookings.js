import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useDispatch } from "react-redux";
import BookingRequest from "services/Requests/Booking";
import Toaster from "../../../components/Toaster/Toaster";

function CompletedBookingRow(props) {
    const { booking } = props;
    const [open, setOpen] = React.useState(false);
    const [status, setStatus] = React.useState(booking.status);
    const dispatch = useDispatch();
    const [showToaster, setShowToaster] = useState(false);
    const [toasterMessage, setToasterMessage] = useState("");
    const [toasterType, setToasterType] = useState("error");

    const handleStatusChange = async (event) => {
        const newStatus = event.target.value;
        try {
            const updatedBooking = {
                ...booking,
                status: newStatus
            };

            await BookingRequest.updateABooking(booking.id, updatedBooking);

            dispatch({
                type: 'UPDATE_BOOKING',
                payload: updatedBooking
            });

            setToasterMessage('Booking Status Updated Successfully!');
            setToasterType('success');
            setShowToaster(true);

        } catch (error) {
            console.error("Update failed:", error);
            setStatus(booking.status);
            setToasterMessage('Booking Status Update Failed!');
            setToasterType('error');
            setShowToaster(true);
        }
    };

    return (
        <React.Fragment>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {booking.id}
                </TableCell>
                <TableCell align="right">{booking.name}</TableCell>
                <TableCell align="right">{booking.email}</TableCell>
                <TableCell align="right">{booking.booking_time}</TableCell>
                <TableCell align="right">
                    <Select
                        value={status}
                        onChange={handleStatusChange}
                        size="small"
                        sx={{
                            minWidth: 120,
                            backgroundColor:
                                status === 'Pending' ? 'yellow' :
                                    status === 'Confirmed' ? 'green' :
                                        status === 'Completed' ? 'blueviolet' : 'red',
                            borderRadius: '4px',
                            '& .MuiSelect-select': {
                                padding: '8px 32px 8px 12px'
                            }
                        }}
                    >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Confirmed">Confirmed</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="Rejected">Rejected</MenuItem>
                    </Select>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Booking Details
                            </Typography>
                            <Table size="small" aria-label="booking-details">
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Faculty:</TableCell>
                                        <TableCell>{booking.faculty}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Contact Number:</TableCell>
                                        <TableCell>{booking.phone_num}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>

                            <Typography variant="h6" gutterBottom component="div" sx={{ mt: 2 }}>
                                Event Information
                            </Typography>
                            <Table size="small" aria-label="event-info">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Event Name</TableCell>
                                        <TableCell>Start Time</TableCell>
                                        <TableCell>End Time</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{booking.event_name}</TableCell>
                                        <TableCell>{booking.start_time}</TableCell>
                                        <TableCell>{booking.end_time}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>

            {showToaster && <Toaster
                message={toasterMessage}
                type={toasterType}
                onClose={() => setShowToaster(false)}
                style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    zIndex: 9999
                }}
            />}
        </React.Fragment>
    );
}

CompletedBookingRow.propTypes = {
    booking: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        faculty: PropTypes.string.isRequired,
        phone_num: PropTypes.string.isRequired,
        booking_time: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        event_name: PropTypes.string.isRequired,
        start_time: PropTypes.string.isRequired,
        end_time: PropTypes.string.isRequired,
    }).isRequired,
};

export default function CompletedBookingsTable({ bookings }) {
    const completedBookings = bookings.filter(booking => booking.status === 'Completed');

    return (
        <TableContainer component={Paper}>
            <Table aria-label="completed-bookings-table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Booking ID</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Booking Time</TableCell>
                        <TableCell align="right">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {completedBookings.map((booking) => (
                        <CompletedBookingRow
                            key={booking.id}
                            booking={booking}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}