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
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem
} from "@mui/material";
import DailyMenuItemRequest from "services/Requests/DailyMenuItem";
import Toaster from "../../components/Toaster/Toaster";

function DailyMenuItemRow(props) {
    const { dailyMenuItem, onDelete, onUpdate } = props;
    const [editOpen, setEditOpen] = React.useState(false);
    const [editedItem, setEditedItem] = React.useState({ ...dailyMenuItem });

    const [toaster, setToaster] = React.useState({
        open: false,
        message: "",
        type: "success",
    });

    const getCategoryName = (id) => {
        switch (id) {
            case 1: return 'Food';
            case 2: return 'Beverage';
            default: return 'Unknown';
        }
    };

    const handleCloseToaster = () => {
        setToaster(prev => ({ ...prev, open: false }));
    };

    const showToaster = (message, type = "success") => {
        setToaster({ open: true, message, type });
    };

    const handleDelete = async () => {
        try {
            await DailyMenuItemRequest.deleteADailyMenuItem(dailyMenuItem.id);
            onDelete(dailyMenuItem.id);
            showToaster("Daily Menu Item deleted successfully", "success");
        } catch (error) {
            showToaster(
                error.response?.data?.error || "Failed to delete menu item",
                "error"
            );
        }
    };

    const handleEditClick = () => {
        setEditedItem({ ...dailyMenuItem });
        setEditOpen(true);
    };

    const handleEditSubmit = async () => {
        try {
            const updatedItem = await DailyMenuItemRequest.updateADailyMenuItem(
                dailyMenuItem.id,
                editedItem
            );
            onUpdate(updatedItem.data);
            setEditOpen(false);
            showToaster("Menu item updated successfully", "success");
        } catch (error) {
            showToaster(
                error.response?.data?.error || "Failed to update menu item",
                "error"
            );
        }
    };

    const handleFieldChange = (field, value) => {
        setEditedItem(prev => ({ ...prev, [field]: value }));
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return isNaN(date) ? 'N/A' : date.toLocaleDateString();
    };

    return (
        <React.Fragment>
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
                        onClick={handleEditClick}
                    >
                        Edit
                    </Button>
                </TableCell>
            </TableRow>

            {/* Edit Modal */}
            <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
                <DialogTitle>Edit Menu Item</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Product ID"
                        type="number"
                        fullWidth
                        value={editedItem.product_id}
                        onChange={(e) => handleFieldChange("product_id", Number(e.target.value))}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        multiline
                        rows={3}
                        value={editedItem.description}
                        onChange={(e) => handleFieldChange("description", e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={editedItem.date.split('T')[0]} // Assuming ISO date format
                        onChange={(e) => handleFieldChange("date", e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditOpen(false)}>Cancel</Button>
                    <Button onClick={handleEditSubmit} color="primary" variant="contained">
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Toaster Component */}
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

DailyMenuItemRow.propTypes = {
    dailyMenuItem: PropTypes.shape({
        id: PropTypes.number.isRequired,
        product_id: PropTypes.number.isRequired,
        description: PropTypes.string,
        date: PropTypes.string.isRequired
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
};

export default function DailyMenuTable({ dailyMenuItems, onDelete, onUpdate }) {
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
                        <DailyMenuItemRow
                            key={dailyMenuItem.id}
                            dailyMenuItem={dailyMenuItem}
                            onDelete={onDelete}
                            onUpdate={onUpdate}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

DailyMenuTable.propTypes = {
    dailyMenuItems: PropTypes.arrayOf(PropTypes.object),
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
};

DailyMenuTable.defaultProps = {
    dailyMenuItems: []
};