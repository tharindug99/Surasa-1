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
import OrderRequest from "services/Requests/Order";
import Toaster from "../../Toaster/Toaster";


function OrderRow(props) {
    const { row, items } = props;  // Add items prop
    const [open, setOpen] = React.useState(false);
    const [status, setStatus] = React.useState(row.status);
    const dispatch = useDispatch();
    const [showToaster, setShowToaster] = useState(false);
    const [toasterMessage, setToasterMessage] = useState("");
    const [toasterType, setToasterType] = useState("error");

    const formatCurrency = (amount) => {
        const num = parseFloat(amount);
        if (isNaN(num)) {
            return `LKR ${amount}`;
        }
        return `LKR ${num.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    };


    const handleStatusChange = async (event) => {
        const newStatus = event.target.value;
        try {
            const updatedOrder = {
                ...row,
                status: newStatus
            };

            await OrderRequest.updateAnOrder(row.id, updatedOrder);

            dispatch({
                type: 'UPDATE_ORDER',
                payload: updatedOrder
            });

            setToasterMessage('Order Status Updated Successfully!');
            setToasterType('success');
            setShowToaster(true);

        } catch (error) {
            console.error("Update failed:", error);
            setStatus(row.status);
            setToasterMessage('Order Status Update Failed!');
            setToasterType('error');
            setShowToaster(true);
        }
    };


    const orderItems = items;

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
                    {row.id}
                </TableCell>
                <TableCell align="right">{row.full_name}</TableCell>
                <TableCell align="right">{row.mobile_number}</TableCell>
                <TableCell align="right">{row.order_time}</TableCell>
                <TableCell align="right"> {formatCurrency(row.total)}</TableCell>
                <TableCell align="right">
                    <Select
                        value={status}
                        onChange={handleStatusChange}
                        size="small"
                        sx={{
                            minWidth: 120,
                            backgroundColor: 'yellow',
                            borderRadius: '4px',
                            '& .MuiSelect-select': {
                                padding: '8px 32px 8px 12px'
                            }
                        }}
                    >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Ready">Ready</MenuItem>
                        <MenuItem value="Processing">Processing</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="Cancelled">Cancelled</MenuItem>
                    </Select>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            {/* Order Details Section */}
                            <Typography variant="h6" gutterBottom component="div">
                                Order Details
                            </Typography>
                            <Table size="small" aria-label="order-details">
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Address:</TableCell>
                                        <TableCell>{row.address}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Total Order Price:</TableCell>
                                        <TableCell>{formatCurrency(row.total)}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>

                            {/* Products Section */}
                            <Typography variant="h6" gutterBottom component="div" sx={{ mt: 2, backgroundColor: "gray" }}>
                                Products
                            </Typography>
                            <Table size="small" aria-label="products" sx={{ backgroundColor: "gray", padding: '20%' }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product ID</TableCell>
                                        <TableCell align="right">Unit Price</TableCell>
                                        <TableCell align="right">Quantity</TableCell>
                                        <TableCell align="right">Total</TableCell>
                                        <TableCell align="right">Created At</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orderItems.length > 0 ? (
                                        orderItems.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.product_id}</TableCell>
                                                <TableCell align="right">{formatCurrency(item.price)}</TableCell>
                                                <TableCell align="right">{item.quantity}</TableCell>
                                                <TableCell align="right">{formatCurrency(item.total_cost)}</TableCell>
                                                <TableCell align="right">
                                                    {new Date(item.created_at).toLocaleString()}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5} align="center">
                                                No products found
                                            </TableCell>
                                        </TableRow>
                                    )}
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

OrderRow.propTypes = {
    row: PropTypes.shape({
        id: PropTypes.number.isRequired,
        full_name: PropTypes.string.isRequired,
        mobile_number: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        order_time: PropTypes.string.isRequired,
        price: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]).isRequired,
        status: PropTypes.string.isRequired,
    }).isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        product_id: PropTypes.number.isRequired,
        price: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]).isRequired,
        quantity: PropTypes.number.isRequired,
        total_cost: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]).isRequired,
        created_at: PropTypes.string.isRequired,
    }))
};

export default function PendingOrdersTable({ orders, orderItems }) {
    // Filter only pending orders
    const pendingOrders = orders.filter(order => order.status === 'Pending');

    return (
        <TableContainer component={Paper}>
            <Table aria-label="pending-orders-table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Order ID</TableCell>
                        <TableCell align="right">Full Name</TableCell>
                        <TableCell align="right">Mobile Number</TableCell>
                        <TableCell align="right">Order Time</TableCell>
                        <TableCell align="right">Total Price</TableCell>
                        <TableCell align="right">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pendingOrders.map((order) => {
                        // Get items for this specific order
                        const orderId = String(order.id);
                        const itemsForOrder = orderItems[orderId] || []; // Use string key
                        //console.log(`Order ${order.id} items:`, itemsForOrder);
                        return (
                            <OrderRow
                                key={order.id}
                                row={order}
                                items={itemsForOrder}  // Pass items to OrderRow
                            />
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}