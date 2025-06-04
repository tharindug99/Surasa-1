import React, { useState, useEffect } from "react";
import {
  Box, Grid, Paper, Typography, TextField, Button,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Collapse, IconButton, Avatar, Snackbar,
  Alert, Select, MenuItem, InputLabel, FormControl
} from "@mui/material";
import {
  KeyboardArrowDown, KeyboardArrowUp,
  Edit, Save, Cancel, CheckCircle,
  LocalShipping, ShoppingCart
} from "@mui/icons-material";
import { styled } from "@mui/system";
import UserRequest from "services/Requests/User";
import useLoading from "hooks/useLoading";
import { connect } from "react-redux";
import { setCurrentUser } from "redux/actions/User";
import UserOrders from "./UserOrders";

const SurasaPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: "16px",
  boxShadow: "0px 8px 24px rgba(149, 157, 165, 0.2)",
  backgroundColor: "#FFF9F0"
}));

const StatusBadge = styled(Box)(({ status }) => ({
  display: "inline-flex",
  alignItems: "center",
  padding: "4px 12px",
  borderRadius: "20px",
  backgroundColor: "orange",
  color: "white",
  fontWeight: 600
}));

const id = localStorage.getItem("User Id");

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
          <StatusBadge status={order.status}>
            {order.status === "Delivered" && <CheckCircle sx={{ fontSize: 16, mr: 0.5 }} />}
            {order.status === "Shipped" && <LocalShipping sx={{ fontSize: 16, mr: 0.5 }} />}
            {order.status === "Processing" && <ShoppingCart sx={{ fontSize: 16, mr: 0.5 }} />}
            {order.status}
          </StatusBadge>
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

const UserDashboard = ({ currentUser, setCurrentUser }) => {
  const [loading, withLoading] = useLoading();
  const [editMode, setEditMode] = useState(false);
  const [editableUser, setEditableUser] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [orders, setOrders] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (id) {
        try {
          const user = await withLoading(UserRequest.getAUser(id));
          setCurrentUser(user?.data);
          setEditableUser(user?.data); // for editing
        } catch (error) {
          console.error("Failed to fetch user info:", error);
        }
      }
    };
    fetchUserData();
  }, [id, setCurrentUser, withLoading]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      if (id) {
        try {
          const ordersRes = await withLoading(UserRequest.getUserOrders(id));
          setOrders(ordersRes?.data || []);
        } catch (error) {
          setOrders([]);
        }
      }
    };
    fetchUserOrders();
  }, [id, withLoading]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableUser({ ...editableUser, [name]: value });
  };

  const handleSaveProfile = () => {
    setEditMode(false);
    setCurrentUser(editableUser); // update Redux
    showSnackbar("Profile updated successfully!", "success");
  };

  const handleSubmitReview = () => {
    if (reviewText.trim() === "") {
      showSnackbar("Please write a review before submitting", "warning");
      return;
    }
    showSnackbar("Review submitted successfully!", "success");
    setReviewText("");
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePic(event.target.result);
      };
      reader.readAsDataURL(file);
      showSnackbar("Profile picture updated!", "success");
    }
  };

  return (
    <Box sx={{
      background: "linear-gradient(135deg, #FFF9F0 0%, #FFEEDB 100%)",
      minHeight: "100vh",
      py: 4,
      px: { xs: 2, md: 8 }
    }}>
      <Grid container spacing={4}>
        {/* Profile Section */}
        <Grid item xs={12} md={4}>
          <SurasaPaper>
            <Box display="flex" flexDirection="column" alignItems="center">
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="profile-pic-upload"
                type="file"
                onChange={handleProfilePicChange}
              />
              <label htmlFor="profile-pic-upload">
                <IconButton component="span">
                  <Avatar
                    src={profilePic}
                    sx={{
                      width: 120,
                      height: 120,
                      border: "3px solid #E6B325",
                      cursor: "pointer"
                    }}
                  />
                </IconButton>
              </label>
              <Typography variant="h5" mt={2} fontWeight="bold">
                {editableUser?.fullName}
              </Typography>
              <Typography color="textSecondary">
                Loyalty Points: <Box component="span" color="#E6B325" fontWeight="bold">{editableUser?.loyaltyPoints}</Box>
              </Typography>

              {editMode ? (
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSaveProfile}
                  sx={{ mt: 2, bgcolor: "#E6B325", "&:hover": { bgcolor: "#D19D20" } }}
                >
                  Save Profile
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  startIcon={<Edit />}
                  onClick={() => setEditMode(true)}
                  sx={{ mt: 2, color: "#E6B325", borderColor: "#E6B325" }}
                >
                  Edit Profile
                </Button>
              )}
            </Box>
          </SurasaPaper>

          {/* Loyalty Rewards */}
          <SurasaPaper sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold" color="#7D4A0A">
              Loyalty Rewards
            </Typography>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography>Current Points:</Typography>
              <Typography fontWeight="bold">{editableUser?.loyaltyPoints} pts</Typography>
            </Box>
            <Box mt={2}>
              <Typography variant="body2" color="textSecondary">
                Redeem your points for special discounts and offers
              </Typography>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  bgcolor: "#7D4A0A",
                  "&:hover": { bgcolor: "#5D380A" }
                }}
              >
                View Rewards
              </Button>
            </Box>
          </SurasaPaper>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={8}>
          {/* Personal Details */}
          <SurasaPaper>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h5" fontWeight="bold" color="#7D4A0A">
                Personal Details
              </Typography>
              {editMode && (
                <Button
                  startIcon={<Cancel />}
                  onClick={() => setEditMode(false)}
                  sx={{ color: "#ff6b6b" }}
                >
                  Cancel
                </Button>
              )}
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="fullName"
                  value={editableUser?.fullName || ""}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  variant={editMode ? "outlined" : "filled"}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Contact Number"
                  name="contactNumber"
                  value={editableUser?.contactNumber || ""}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  variant={editMode ? "outlined" : "filled"}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={editableUser?.email || ""}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  variant={editMode ? "outlined" : "filled"}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={editableUser?.password || ""}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  variant={editMode ? "outlined" : "filled"}
                />
              </Grid>
            </Grid>
          </SurasaPaper>

          {/* Order History */}
          <SurasaPaper sx={{ mt: 3 }}>
            {/* <Typography variant="h5" fontWeight="bold" mb={3} color="#7D4A0A">
              Order History
            </Typography>

            {orders.length === 0 ? (
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
            )} */}
            <UserOrders />
          </SurasaPaper>

          {/* Review Section */}
          <SurasaPaper sx={{ mt: 3 }}>
            <Typography variant="h5" fontWeight="bold" mb={3} color="#7D4A0A">
              Add a Review
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Select Product</InputLabel>
                  <Select label="Select Product">
                    <MenuItem value="prod1">Product A</MenuItem>
                    <MenuItem value="prod2">Product B</MenuItem>
                    <MenuItem value="prod3">Product C</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Your Review"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={handleSubmitReview}
                  sx={{
                    bgcolor: "#7D4A0A",
                    "&:hover": { bgcolor: "#5D380A" },
                    py: 1.5,
                    px: 4
                  }}
                >
                  Submit Review
                </Button>
              </Grid>
            </Grid>
          </SurasaPaper>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = {
  setCurrentUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);