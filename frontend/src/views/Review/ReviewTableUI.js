import * as React from "react";
import PropTypes from "prop-types";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Collapse,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TablePagination
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import Toaster from "../../components/Toaster/Toaster";
import ReviewRequest from "services/Requests/Review";

function ReviewRow(props) {
  const { review, onStatusChange, onDelete } = props;
  const [open, setOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [toaster, setToaster] = React.useState({
    open: false,
    message: "",
    type: "success",
  });

  const handleCloseToaster = () => {
    setToaster(prev => ({ ...prev, open: false }));
  };

  const showToaster = (message, type = "success") => {
    setToaster({ open: true, message, type });
  };

  const handleDelete = async () => {
    try {
      setDeleteOpen(false);
      await ReviewRequest.deleteAReview(review.id);
      onDelete(review.id);
      showToaster("Review deleted successfully", "success");
    } catch (error) {
      showToaster(
        error.response?.data?.error || "Failed to delete review",
        "error"
      );
    }
  };

  const handleStatusUpdate = (status) => {
    onStatusChange(review.id, status);
    console.log(review.id, status, " From UI Table ")
    showToaster(`Review ${status} successfully`, "success");
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
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{review.full_name}</TableCell>
        <TableCell>
          {review.comment.length > 50
            ? `${review.comment.substring(0, 50)}...`
            : review.comment}
        </TableCell>
        <TableCell align="right">{review.no_of_stars}</TableCell>
        <TableCell align="right">
          <Typography
            variant="body2"
            sx={{
              color: review.status === 'approved'
                ? 'green'
                : review.status === 'rejected'
                  ? 'red'
                  : 'orange',
              fontWeight: 'bold'
            }}
          >
            {review.status}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={() => handleStatusUpdate("approved")}
            sx={{ mr: 1 }}
          >
            Approve
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => setDeleteOpen(true)}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Additional Details
              </Typography>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell>Full Comment:</TableCell>
                    <TableCell>{review.comment}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Created At:</TableCell>
                    <TableCell>{new Date(review.created_at).toLocaleString()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Updated At:</TableCell>
                    <TableCell>{new Date(review.updated_at).toLocaleString()}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this review?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {toaster.open && (
        <Toaster
          message={toaster.message}
          type={toaster.type}
          onClose={handleCloseToaster}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9999
          }}
        />
      )}
    </React.Fragment>
  );
}

ReviewRow.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.number.isRequired,
    full_name: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    no_of_stars: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
  }).isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default function ReviewsTable({ rows, onStatusChange, onDelete }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 700 }}>
        <Table stickyHeader aria-label="reviews-table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: 50 }} />
              <TableCell style={{ minWidth: 170 }}>Name</TableCell>
              <TableCell style={{ minWidth: 250 }}>Comment</TableCell>
              <TableCell style={{ minWidth: 100, textAlign: 'right' }}>Stars</TableCell>
              <TableCell style={{ minWidth: 100, textAlign: 'right' }}>Status</TableCell>
              <TableCell style={{ minWidth: 170, textAlign: 'right' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((review) => (
                <ReviewRow
                  key={review.id}
                  review={review}
                  onStatusChange={onStatusChange}
                  onDelete={onDelete}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

ReviewsTable.propTypes = {
  rows: PropTypes.array.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};