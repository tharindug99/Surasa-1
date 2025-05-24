// frontend/src/components/menu/DailyMenuTable.js
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
    Button
} from "@mui/material";

function DailyMenuItemRow({ dailyMenuItem }) {
    const getCategoryName = (id) => {
        switch (id) {
            case 1: return 'Food';
            case 2: return 'Beverage';
            default: return 'Unknown';
        }
    };

    const handleDelete = () => {
        console.log('Delete menu item:', dailyMenuItem.id);
        // Add your delete logic here
    };

    const handleEdit = () => {
        console.log('Edit menu item:', dailyMenuItem.id);
        // Add your edit logic here
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return isNaN(date) ? 'N/A' : date.toLocaleDateString();
    };

    return (
        <TableRow>
            <TableCell component="th" scope="row">
                {dailyMenuItem.id}
            </TableCell>
            <TableCell align="right">
                {getCategoryName(dailyMenuItem.product_id)}
            </TableCell>
            <TableCell align="right" sx={{ width: "300px", textAlign: "left" }}>
                {dailyMenuItem.description || 'No description'}
            </TableCell>
            <TableCell align="right">
                {formatDate(dailyMenuItem.date)}
            </TableCell>
            <TableCell align="right">
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={handleDelete}
                    sx={{ mr: 1 }}
                >
                    Delete
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={handleEdit}
                >
                    Edit
                </Button>
            </TableCell>
        </TableRow>
    );
}

DailyMenuItemRow.propTypes = {
    dailyMenuItem: PropTypes.shape({
        id: PropTypes.number.isRequired,
        product_id: PropTypes.number.isRequired,
        description: PropTypes.string,
        date: PropTypes.string.isRequired
    }).isRequired
};

export default function DailyMenuTable({ dailyMenuItems }) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="daily-menu-table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Product Category</TableCell>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="right">Date</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(dailyMenuItems || []).map((dailyMenuItem) => (
                        <DailyMenuItemRow key={dailyMenuItem.id} dailyMenuItem={dailyMenuItem} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

DailyMenuTable.propTypes = {
    dailyMenuItems: PropTypes.arrayOf(PropTypes.object)
};

DailyMenuTable.defaultProps = {
    dailyMenuItems: []
};