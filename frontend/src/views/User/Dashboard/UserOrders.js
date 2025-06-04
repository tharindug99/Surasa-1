import React, { useEffect, useState } from "react";
import {
    Box, Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Collapse, IconButton, Paper
} from "@mui/material";
import {
    KeyboardArrowDown, KeyboardArrowUp,
    CheckCircle, LocalShipping, ShoppingCart
} from "@mui/icons-material";
import useLoading from "hooks/useLoading";
import UserRequest from "services/Requests/User";

function OrderRow({ order }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                <TableCell>{order.id}</TableCell>
                <TableCell>{new Date(order.order_time).toLocaleDateString()}</TableCell>
                <TableCell>
                    <Box
                        sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            padding: "4px 12px",
                            borderRadius: "20px",
                            backgroundColor: "orange",
                            color: "white",
                            fontWeight: 600
                        }}
                    >
                        {order.status === "Delivered" && <CheckCircle sx={{ fontSize: 16, mr: 0.5 }} />}
                        {order.status === "Shipped" && <LocalShipping sx={{ fontSize: 16, mr: 0.5 }} />}
                        {order.status === "Processing" && <ShoppingCart sx={{ fontSize: 16, mr: 0.5 }} />}
                        {order.status}
                    </Box>
                </TableCell>
                <TableCell>${order.price?.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom>
                                Order Items
                            </Typography>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product ID</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell align="right">Quantity</TableCell>
                                        <TableCell align="right">Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {order.items?.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.product_id}</TableCell>
                                            <TableCell align="right">${item.price?.toFixed(2)}</TableCell>
                                            <TableCell align="right">{item.quantity}</TableCell>
                                            <TableCell align="right">${item.total_cost?.toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Box mt={2}>
                                <Typography variant="subtitle1">
                                    <strong>Delivery Address:</strong> {order.address}
                                </Typography>
                            </Box>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, withLoading] = useLoading();
    const userId = localStorage.getItem("User Id");

    useEffect(() => {
        const fetchUserOrders = async () => {
            if (userId) {
                try {
                    const ordersRes = await withLoading(UserRequest.getUserOrders(userId));
                    setOrders(ordersRes?.data || []);
                } catch (error) {
                    setOrders([]);
                }
            }
        };
        fetchUserOrders();
        // eslint-disable-next-line
    }, [userId]);

    return (
        <Box sx={{ mt: 3 }}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h5" fontWeight="bold" mb={3} color="#7D4A0A">
                    Order History
                </Typography>
                {loading ? (
                    <Typography>Loading orders...</Typography>
                ) : orders.length === 0 ? (
                    <Typography textAlign="center" py={4} color="textSecondary">
                        You have no orders yet
                    </Typography>
                ) : (
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ bgcolor: "#FFEEDB" }}>
                                    <TableCell />
                                    <TableCell><b>Order ID</b></TableCell>
                                    <TableCell><b>Date</b></TableCell>
                                    <TableCell><b>Status</b></TableCell>
                                    <TableCell><b>Total</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((order) => (
                                    <OrderRow key={order.id} order={order} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Paper>
        </Box>
    );
};

export default UserOrders;