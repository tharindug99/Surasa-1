import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Toaster from 'components/Toaster/Toaster';

const columns = [
  { id: 'full_name', label: 'Name', minWidth: 170, width: 170 },
  { id: 'comment', label: 'Comment', minWidth: 85, width: 85 },
  { id: 'no_of_stars', label: 'Stars', minWidth: 100, width: 100, align: 'right' },
  { id: 'status', label: 'Status', minWidth: 100, width: 100, align: 'right' },
  { id: 'actions', label: 'Actions', minWidth: 170, width: 170, align: 'right' }
];

export default function StickyHeadTable({ rows, onStatusChange }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [toaster, setToaster] = React.useState({
    open: false,
    message: '',
    type: 'success',
  });


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleStatusUpdate = async (reviewId, status) => {
    try {
      await onStatusChange(reviewId, status);
      // Optionally, you can refresh the rows or show a success message here
      setToaster({
        open: true,
        message: `Review ${status} successfully!`,
        type: 'success',
      });

    } catch (error) {
      console.error('Status update failed:', error);
      setToaster({
        open: true,
        message: `Failed to update review status: ${error.message}`,
        type: 'error',
      });
    }
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 700 }}>
        <Table stickyHeader aria-label="sticky table" style={{ tableLayout: 'fixed' }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    width: column.width,
                    backgroundColor: '#f5f5f5',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    if (column.id === 'actions') {
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ width: column.width }}
                        >
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleStatusUpdate(row.id, 'approved')}
                            sx={{ mr: 1 }}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleStatusUpdate(row.id, 'rejected')}
                          >
                            Reject
                          </Button>
                        </TableCell>
                      );
                    }

                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          width: column.width,
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word',
                          ...(column.id === 'comment' && {
                            maxWidth: column.width,
                            overflow: 'hidden',
                          }),
                        }}
                      >
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
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

StickyHeadTable.propTypes = {
  rows: PropTypes.array.isRequired,
  onStatusChange: PropTypes.func.isRequired,
};