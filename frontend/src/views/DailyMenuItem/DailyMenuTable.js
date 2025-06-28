import * as React from "react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
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
    TextField,
    MenuItem
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import useLoading from "hooks/useLoading";
import DailyMenuItemRequest from "services/Requests/DailyMenuItem";
import Toaster from "../../components/Toaster/Toaster";
import { setCategories as setCategoriesAction } from "redux/actions";
import CategoryRequest from "services/Requests/Category";
import { useDispatch } from "react-redux";

function DailyMenuItemRow(props) {
    const dispatch = useDispatch();
    const { dailyMenuItem, onDelete, onUpdate } = props;
    const [open, setOpen] = React.useState(false);
    const [loading, withLoading] = useLoading();
    const [editOpen, setEditOpen] = React.useState(false);
    const [editedItem, setEditedItem] = React.useState({ ...dailyMenuItem });
    const [categories, setCategories] = useState([]);
    // Add this state variable at the top of DailyMenuItemRow
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

    // Replace the existing handleDelete function with this:
    const handleDeleteClick = () => {
        setDeleteModalOpen(true);
    };

    const [toaster, setToaster] = React.useState({
        open: false,
        message: "",
        type: "success",
    });

    useEffect(() => {
        setEditedItem({ ...dailyMenuItem });
    }, [dailyMenuItem]);

    useEffect(() => {
        getAllCategories();
    }, [])

    const handleCloseToaster = () => {
        setToaster(prev => ({ ...prev, open: false }));
    };

    const showToaster = (message, type = "success") => {
        setToaster({ open: true, message, type });
    };

    // const handleDelete = async () => {
    //     try {
    //         await DailyMenuItemRequest.deleteADailyMenuItem(dailyMenuItem.id);
    //         onDelete(dailyMenuItem.id);
    //         showToaster("Menu item deleted successfully", "success");
    //     } catch (error) {
    //         showToaster(
    //             error.response?.data?.error || "Failed to delete item",
    //             "error"
    //         );
    //     }
    // };

    const handleEditClick = () => {
        setEditedItem({ ...dailyMenuItem });
        setEditOpen(true);
    };

    //     try {
    //         const updatedItem = await DailyMenuItemRequest.updateADailyMenuItem(
    //             dailyMenuItem.id,
    //             editedItem
    //         );
    //         if (editedItem.category_id) {
    //             formData.append('category_id', editedItem.category_id);
    //         }
    //         onUpdate(updatedItem.data);
    //         console.log("Updated Item:", updatedItem.data);
    //         setEditOpen(false);
    //         showToaster("Menu item updated successfully", "success");
    //     } catch (error) {
    //         showToaster(
    //             error.response?.data?.error || "Failed to update item",
    //             "error"
    //         );
    //     }
    // };

    const handleEditSubmit = async () => {
        try {
            // Prepare the payload, mapping category to category_id if needed
            const payload = {
                ...editedItem,
                category_id: editedItem.category || editedItem.category_id,
            };

            // Remove 'category' if present (to avoid confusion in backend)
            delete payload.category;

            const updatedItem = await DailyMenuItemRequest.updateADailyMenuItem(
                dailyMenuItem.id,
                payload
            );

            onUpdate(updatedItem.data);
            console.log("Updated Item:", updatedItem.data);
            setEditOpen(false);
            showToaster("Menu item updated successfully", "success");
            getAllDailyMenuItems();
        } catch (error) {
            showToaster(
                error.response?.data?.error || "Failed to update item",
                "error"
            );
        }
    };

    const handleFieldChange = (field, value) => {
        setEditedItem(prev => ({ ...prev, [field]: value }));
    };

    const getAllCategories = async () => {
        try {
            const response = await withLoading(CategoryRequest.getAllCategories());
            const categoriesData = response?.data || [];
            setCategories(categoriesData); // Store categories in local state
            dispatch(setCategoriesAction(categoriesData)); // Update Redux store if needed
        } catch (error) {
            console.error(error);
        }
    };

    const getAllDailyMenuItems = async () => {
        try {
            const response = await withLoading(DailyMenuItemRequest.getAllDailyMenuItem());
            const dailyMenuItemsData = response?.data || [];
            console.log("Daily Menu Items Data:", dailyMenuItemsData);
            // Update the Redux store or local state if needed
            dispatch(dailyMenuItemsData(dailyMenuItemsData)); // Uncomment if you have a Redux action

        } catch (error) {
            console.error("Error fetching daily menu items:", error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return isNaN(date) ? 'N/A' : date.toLocaleDateString();
    };

    const handleConfirmDelete = async () => {
        try {
            await DailyMenuItemRequest.deleteADailyMenuItem(dailyMenuItem.id);
            onDelete(dailyMenuItem.id);
            showToaster("Menu item deleted successfully", "success");
            setDeleteModalOpen(false);
            getAllDailyMenuItems();
        } catch (error) {
            showToaster(
                error.response?.data?.error || "Failed to delete item",
                "error"
            );
            setDeleteModalOpen(false);
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
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {dailyMenuItem.id}
                </TableCell>
                <TableCell align="right">{dailyMenuItem.name}</TableCell>
                <TableCell align="right">
                    {dailyMenuItem.image ? (
                        <img
                            src={dailyMenuItem.image}
                            alt={dailyMenuItem.name}
                            style={{ width: 70, height: 70, borderRadius: '10%', marginLeft: '55%' }}
                        />
                    ) : (
                        <Typography variant="body2" color="textSecondary">
                            No Image
                        </Typography>
                    )}
                </TableCell>
                <TableCell align="right">
                    {dailyMenuItem.price ? `LKR ${dailyMenuItem.price}` : "N/A"}
                </TableCell>
                <TableCell align="right">{formatDate(dailyMenuItem.date)}</TableCell>
                <TableCell align="right">
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={handleDeleteClick}
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

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Additional Details
                            </Typography>
                            <Table size="small" aria-label="additional-details">
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Description:</TableCell>
                                        <TableCell>{dailyMenuItem.description || 'No description'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Product ID:</TableCell>
                                        <TableCell>{dailyMenuItem.product_id}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>

            {/* Edit Modal */}
            <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
                <DialogTitle>Edit Menu Item</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Name"
                        fullWidth
                        multiline
                        value={editedItem.name}
                        onChange={(e) => handleFieldChange("name", e.target.value)}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        select
                        margin="dense"
                        label="Category"
                        fullWidth
                        value={editedItem.category_id}
                        onChange={(e) => handleFieldChange("category_id", e.target.value)}
                        sx={{ mt: 2 }}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </TextField>
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
                        value={editedItem.date.split('T')[0]}
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

            <Dialog open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        Are you sure you want to delete "{dailyMenuItem.name}"?
                    </Typography>
                    <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                        This will permanently remove this menu item.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
                    <Button
                        onClick={handleConfirmDelete}
                        color="error"
                        variant="contained"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Toaster */}
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
        price: PropTypes.number,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        date: PropTypes.string.isRequired
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    dailyMenuItems: PropTypes.arrayOf(PropTypes.object)
};

export default function DailyMenuTable({ dailyMenuItems, onDelete, onUpdate }) {

    console.log("Daily Menu Items from method:", dailyMenuItems);
    return (
        <TableContainer component={Paper}>
            <Table aria-label="daily-menu-table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Image</TableCell>
                        <TableCell align="right">Price</TableCell>
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
    dailyMenuItem: PropTypes.arrayOf(PropTypes.object),
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

DailyMenuTable.defaultProps = {
    dailyMenuItem: [],
};