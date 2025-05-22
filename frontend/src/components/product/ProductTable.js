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
    Button
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

function ProductRow(props) {
    const { product } = props;
    const [open, setOpen] = React.useState(false);

    const getCategoryName = (id) => {
        switch (id) {
            case 1: return 'Food';
            case 2: return 'Beverage';
            default: return 'Unknown';
        }
    };

    const handleDelete = () => {
        console.log('Delete product:', product.id);
        // Add your delete logic here
    };

    const handleAddToMenu = () => {
        console.log('Add to menu:', product.id);
        // Add your add to menu logic here
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
                <TableCell align="right"
                    sx={{
                        width: "250px",
                        textAlign: "left"
                    }}>{product.description || 'No description'}</TableCell>
                <TableCell align="right">{getCategoryName(product.category_id)}</TableCell>
                <TableCell align="right">{product.price ? `$${product.price}` : 'N/A'}</TableCell>
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
                        onClick={handleDelete}
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
                                        <TableCell>{product.description || 'No description available'}</TableCell>
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
        </React.Fragment>
    );
}

ProductRow.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        category_id: PropTypes.number.isRequired,
        description: PropTypes.string
    }).isRequired
};

export default function ProductsTable({ products }) {
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
                        <ProductRow key={product.id} product={product} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

ProductsTable.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object)
};

ProductsTable.defaultProps = {
    products: []
};