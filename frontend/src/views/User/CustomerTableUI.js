import * as React from "react";
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
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";

function Row(props) {
  const { row, handleOpenModal, onDeleteUser } = props;
  const [open, setOpen] = React.useState(false);

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
          {row.first_name} {row.last_name}
        </TableCell>
        <TableCell align="right">{row.email}</TableCell>
        <TableCell align="right">{row.phone_num}</TableCell>
        <TableCell align="right">{row.loyalty_points}</TableCell>
        <TableCell align="right">
          <Button
            variant="contained"
            onClick={() => onDeleteUser(row.id)}
            size="small"
            sx={{
              ml: 1,
              backgroundColor: 'red',
              color: 'white',
              borderRadius: '4px', // Adjust radius as needed (4px is Material UI default)
              '&:hover': {
                backgroundColor: '#d32f2f',
              }
            }}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenModal(row.id, true)}
            size="small"
            sx={{ ml: 1 }}
          >
            Add
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleOpenModal(row.id, false)}
            size="small"
            sx={{ ml: 1 }}
          >
            Deduct
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                User Details
              </Typography>
              <Typography variant="body1">ID: {row.id}</Typography>
              <Typography variant="body1">
                Created At: {row.created_at}
              </Typography>
              <Typography variant="body1">
                Updated At: {row.updated_at}
              </Typography>
              <Typography variant="body1">
                Verified: {row.email_verified_at ? "Yes" : "No"}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    created_at: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    email_verified_at: PropTypes.string,
    first_name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    last_name: PropTypes.string.isRequired,
    loyalty_points: PropTypes.number.isRequired,
    phone_num: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
  }).isRequired,
  handleOpenModal: PropTypes.func.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
};

export default function CollapsibleTable({ rows, handleOpenModal, onDeleteUser }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone Number</TableCell>
            <TableCell align="right">Loyalty Points</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row
              key={row.id}
              row={row}
              handleOpenModal={handleOpenModal}
              onDeleteUser={onDeleteUser}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

CollapsibleTable.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      created_at: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      email_verified_at: PropTypes.string,
      first_name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      last_name: PropTypes.string.isRequired,
      loyalty_points: PropTypes.number.isRequired,
      phone_num: PropTypes.string.isRequired,
      updated_at: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleOpenModal: PropTypes.func.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
};