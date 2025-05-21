// frontend/src/components/product/ProductTable.js
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
    TextField,
    Snackbar,
    Alert,
    MenuItem
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import ProductRequest from "services/Requests/Product";

function ProductRow(props) {
    const { product, onDelete, onUpdate } = props;
    const [open, setOpen] = React.useState(false);
    const [editOpen, setEditOpen] = React.useState(false);
    const [editedProduct, setEditedProduct] = React.useState({ ...product });
    const [toaster, setToaster] = React.useState({
        open: false,
        message: "",
        type: "success",
    });

    const getCategoryName = (id) => {
        switch (id) {
            case 1:
                return "Food";
            case 2:
                return "Beverage";
            default:
                return "Unknown";
        }
    };

    const handleDelete = async () => {
        try {
            await ProductRequest.deleteAProduct(product.id);
            onDelete(product.id);
            showToaster("Product deleted successfully", "success");
        } catch (error) {
            showToaster(
                error.response?.data?.error || "Failed to delete product",
                "error"
            );
        }
    };

    const handleEditClick = () => {
        setEditedProduct({ ...product });
        setEditOpen(true);
    };

    // In ProductRow component, update the handleEditSubmit function
    const handleEditSubmit = async () => {
        try {
            
            const updatedProduct = await ProductRequest.updateAProduct(
                product.id,
                editedProduct
            );
            onUpdate(updatedProduct);
            setEditOpen(false);
            showToaster("Product updated successfully", "success");
        } catch (error) {
            showToaster(
                error.response?.data?.error || "Failed to update product",
                "error"
            );
        }
    };

    const handleFieldChange = (field, value) => {
        setEditedProduct((prev) => ({ ...prev, [field]: value }));
    };

    const showToaster = (message, type) => {
        setToaster({ open: true, message, type });
    };

    const handleCloseToaster = () => {
        setToaster((prev) => ({ ...prev, open: false }));
    };

    const handleAddToMenu = () => {
        console.log("Add to menu:", product.id);
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
                    {product.id}
                </TableCell>
                <TableCell align="right">{product.name}</TableCell>
                <TableCell
                    align="right"
                    sx={{
                        width: "250px",
                        textAlign: "left",
                    }}
                >
                    {product.description || "No description"}
                </TableCell>
                <TableCell align="right">{getCategoryName(product.category_id)}</TableCell>
                <TableCell align="right">
                    {product.price ? `$${product.price}` : "N/A"}
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
                        sx={{ mr: 1 }}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={handleAddToMenu}
                    >
                        Add to Menu
                    </Button>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Additional Details
                            </Typography>
                            <Table size="small" aria-label="product-details">
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Full Description:</TableCell>
                                        <TableCell>{product.description || "No description available"}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Category ID:</TableCell>
                                        <TableCell>{product.category_id}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>

            {/* Edit Modal */}
            <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Name"
                        fullWidth
                        value={editedProduct.name}
                        onChange={(e) => handleFieldChange("name", e.target.value)}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        multiline
                        rows={3}
                        value={editedProduct.description}
                        onChange={(e) => handleFieldChange("description", e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Price"
                        type="number"
                        fullWidth
                        value={editedProduct.price}
                        onChange={(e) => handleFieldChange("price", parseFloat(e.target.value))}
                    />
                    <TextField
                        select
                        margin="dense"
                        label="Category"
                        fullWidth
                        value={editedProduct.category_id}
                        onChange={(e) => handleFieldChange("category_id", Number(e.target.value))}
                    >
                        <MenuItem value={1}>Food</MenuItem>
                        <MenuItem value={2}>Beverage</MenuItem>
                    </TextField>

                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="avatar-upload"
                        type="file"
                        onChange={(e) => handleFieldChange("avatar", e.target.files[0])}
                    />
                    <label htmlFor="avatar-upload">
                        <Button variant="contained" component="span" sx={{ mt: 2 }}>
                            Upload New Image
                        </Button>
                    </label>

                    {editedProduct.avatar && (
                        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                            {editedProduct.avatar instanceof File
                                ? `New file: ${editedProduct.avatar.name}`
                                : `Current image: ${editedProduct.avatar}`}
                        </Typography>
                    )}

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditOpen(false)}>Cancel</Button>
                    <Button onClick={handleEditSubmit} color="primary" variant="contained">
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Toaster */}
            <Snackbar
                open={toaster.open}
                autoHideDuration={6000}
                onClose={handleCloseToaster}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    onClose={handleCloseToaster}
                    severity={toaster.type}
                    sx={{ width: "100%" }}
                >
                    {toaster.message}
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}

ProductRow.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        category_id: PropTypes.number.isRequired,
        description: PropTypes.string,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

export default function ProductsTable({ products, onDelete, onUpdate }) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="products-table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="right">Category</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(products || []).map((product) => (
                        <ProductRow
                            key={product.id}
                            product={product}
                            onDelete={onDelete}
                            onUpdate={onUpdate}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

ProductsTable.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object),
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

ProductsTable.defaultProps = {
    products: [],
};