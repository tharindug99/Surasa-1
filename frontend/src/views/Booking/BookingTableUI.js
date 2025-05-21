import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import * as React from "react";
import { useState, useEffect } from "react";
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
import Toaster from "../../components/Toaster/Toaster";
// Add these at the top with other imports

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState(row.status);
  const dispatch = useDispatch();
  const [showToaster, setShowToaster] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");
  const [toasterType, setToasterType] = useState("error");

  // Set initial status from row prop
  useEffect(() => {
    setStatus(row.status);
  }, [row.status]);

  // In Row component
  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    try {
      // Create full booking object with existing values + new status
      const updatedBooking = {
        ...row, // Spread all existing properties
        status: newStatus
      };

      // Send full validated object
      await BookingRequest.updateABooking(row.id, updatedBooking);

      // Update Redux store
      dispatch({
        type: 'UPDATE_BOOKING',
        payload: updatedBooking
      });

      setToasterMessage('Booking Status Updated Successfully!');
      setToasterType('success');
      setShowToaster(true);

    } catch (error) {
      console.error("Update failed:", error.response?.data);
      // Revert UI state on error
      setStatus(row.status);
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
          {row.name}
        </TableCell>
        <TableCell align="right">{row.email}</TableCell>
        <TableCell align="right">{row.faculty}</TableCell>
        <TableCell align="right">{row.phone_num}</TableCell>
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
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
            <MenuItem value="Confirmed">Confirmed</MenuItem>
          </Select>
        </TableCell>
      </TableRow>
      {/* Keep existing collapse structure */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="details">
                <TableHead>
                  <TableRow>
                    <TableCell>Event Name</TableCell>
                    <TableCell>Start Time</TableCell>
                    <TableCell>End Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {row.event_name}
                    </TableCell>
                    <TableCell>{row.start_time}</TableCell>
                    <TableCell>{row.end_time}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      {showToaster &&
        <Toaster
          message={toasterMessage}
          type={toasterType}
          onClose={() => setShowToaster(false)}
        />}

    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    faculty: PropTypes.string.isRequired,
    phone_num: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    event_name: PropTypes.string.isRequired,
    start_time: PropTypes.string.isRequired,
    end_time: PropTypes.string.isRequired,
  }).isRequired,
};

export default function CollapsibleTable({ rows }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Faculty</TableCell>
            <TableCell align="right">Contact Number</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>

    </TableContainer>
  );
}
