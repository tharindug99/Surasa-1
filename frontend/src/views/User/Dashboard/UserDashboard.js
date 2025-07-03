import useLoading from 'hooks/useLoading';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setCurrentUser } from 'redux/actions';
import UserRequest from 'services/Requests/User';
import OrderRequest from 'services/Requests/Order';
import OrderItemRequest from 'services/Requests/OrderItem';
import ProductRequest from 'services/Requests/Product';
import ReviewRequest from 'services/Requests/Review';
import {
  Box, Grid, Paper, Typography, Avatar, Button, TextField,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Collapse, IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
  Rating, TextareaAutosize
} from "@mui/material";
import { styled } from "@mui/system";
import {
  CheckCircle, Edit, Save, Cancel,
  KeyboardArrowDown, KeyboardArrowUp
} from "@mui/icons-material";
import { brown, yellow, white } from "@mui/material/colors";
import isAuthenticated from "auth/userAuth";
import { useNavigate } from "react-router-dom";

// Styled components
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

const StatusIndicator = styled(Box)(({ status }) => ({
  display: "inline-block",
  padding: "4px 10px",
  borderRadius: "12px",
  fontSize: "0.75rem",
  fontWeight: 600,
  backgroundColor:
    status === 'completed' ? '#4CAF50' :
      status === 'pending' ? '#FFC107' :
        status === 'cancelled' ? '#F44336' : '#9E9E9E',
  color: "white"
}));

const NestedTableContainer = styled(Box)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  padding: theme.spacing(2),
  backgroundColor: "#FFF5E6",
  borderRadius: "8px",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)"
}));

const UserDetail = props => {
  const { setCurrentUser } = props;
  const { id } = useParams();
  const [loading, withLoading] = useLoading();
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [expandedOrders, setExpandedOrders] = useState({});
  const [orderItems, setOrderItems] = useState({}); // Store items grouped by order ID
  const [productsMap, setProductsMap] = useState({});
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [currentReviewItem, setCurrentReviewItem] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviewImage, setReviewImage] = useState(null);
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  const handleGetUser = async () => {
    try {
      const response = await withLoading(UserRequest.getAUser(id));
      setUserData(response?.data);
      setCurrentUser(response?.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleGetOrders = async () => {
    try {
      const response = await withLoading(OrderRequest.getAllOrders());
      const filteredOrders = response?.data?.filter(order => String(order.user_id) === String(id));
      setOrders(filteredOrders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleGetProducts = async () => {
    try {
      const response = await withLoading(ProductRequest.getAllProducts());
      const productsData = response?.data || [];

      // Create mapping object {id: name}
      const productNameMap = {};
      productsData.forEach(product => {
        productNameMap[product.id] = product.name;
      });

      setProductsMap(productNameMap);
      console.log("Products Map:", productNameMap);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // CORRECTED: Group order items by order ID
  const handleGetOrderItems = async () => {
    try {
      const response = await withLoading(OrderItemRequest.getAllOrderItems());
      const userItems = response?.data?.filter(item => String(item.user_id) === String(id));

      // Group items by order_id
      const groupedItems = {};
      userItems.forEach(item => {
        if (!groupedItems[item.order_id]) {
          groupedItems[item.order_id] = [];
        }
        groupedItems[item.order_id].push(item);
      });

      setOrderItems(groupedItems);
    } catch (error) {
      console.error("Error fetching order items:", error);
      setOrderItems({});
    }
  };

  // Fetch reviews
  const handleGetReviews = async () => {
    try {
      const response = await withLoading(ReviewRequest.getAllReviews());
      const userReviews = response?.data?.filter(review => String(review.user_id) === String(id));
      console.log("User Reviews:", userReviews);
      setReviews(userReviews || []);
      console.log("reviews", reviews.length);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };
  const handleOrderNowClick = () => {
    if (isAuthenticated()) {
      navigate("/place-order");
    } else {
      localStorage.removeItem("authToken");
      localStorage.removeItem("tokenExpiration");
      localStorage.removeItem("userId");
      localStorage.removeItem("first_name");
      navigate("/login");
    }
  };
  const handleEditToggle = () => {
    setEditMode(!editMode);
    setEditedData(userData);
  };

  const handleInputChange = (field, value) => {
    setEditedData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const payload = typeof editedData === 'object' && editedData !== null
        ? editedData
        : {};

      const response = await withLoading(
        UserRequest.updateAUser(id, payload)  // Pass the validated object
      );

      setUserData(response);
      setCurrentUser(response);
      setEditMode(false);
      handleGetUser();  // Refresh user data after update
    } catch (error) {
      console.error("Error updating user:", error);
      console.error("EditedData value:", editedData);  // Log the problematic value
    }
  };

  useEffect(() => {
    handleGetUser();
    handleGetOrders();
    handleGetOrderItems();
    handleGetProducts();
    handleGetReviews();
  }, []);

  const handleOpenReviewModal = (item) => {
    setCurrentReviewItem(item);
    setRating(item.rating || 0);  // Pre-populate if review exists
    setComment(item.comment || ''); // Pre-populate if review exists
    setReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setReviewModalOpen(false);
    setCurrentReviewItem(null);
    setRating(0);
    setComment('');
    setReviewImage(null);
  };

  const handleSubmitReview = async () => {
    if (!currentReviewItem) return;

    try {
      // Create FormData object
      const formData = new FormData();

      // Append all review data to FormData
      formData.append('user_id', id);
      formData.append('status', 'pending');
      formData.append('product_id', currentReviewItem.product_id);
      formData.append('no_of_stars', rating);
      formData.append('full_name', userData.first_name);
      formData.append('comment', comment);
      formData.append('order_id', currentReviewItem.order_id);

      // If there's an image file, append it
      if (reviewImage) {
        formData.append('review_image', reviewImage);
      }

      console.log('Review before submitted:', Object.fromEntries(formData));

      // Submit review with FormData
      await withLoading(ReviewRequest.addAReview(formData));
      console.log('Review submitted successfully');
      setIsReviewSubmitted(true);
      handleCloseReviewModal();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  //Check whether a product review is already submitted from ReviewRequest
  // const isReviewAlreadySubmitted = (orderId, productId) => {
  //   console.log("Get review length:", reviews.length);

  //   if (!reviews || reviews.length === 0) {
  //     console.log("No reviews found for this user.");
  //     return false;
  //   }

  //   console.log("Reviews are found for this user");

  //   const isSubmitted = reviews.some(review => review.product_id === productId);

  //   console.log("Review already submitted:", isSubmitted);
  //   return isSubmitted;
  // };

  const isReviewAlreadySubmitted = (orderId, productId) => {
    console.log("Get review length:", reviews.length);

    if (!reviews || reviews.length === 0) {
      console.log("No reviews found for this user.");
      return false;
    }

    console.log("Reviews are found for this user");

    // Check for a review matching BOTH orderId AND productId
    const isSubmitted = reviews.some(review =>
      review.order_id === orderId &&
      review.product_id === productId
    );
    console.log("Order ID:", orderId);
    console.log("Product ID:", productId);
    console.log("Review already submitted:", isSubmitted);
    return isSubmitted;
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'LKR',
    }).format(amount);
  };

  return (
    <Box sx={{
      background: "linear-gradient(135deg, #FFF9F0 0%, #FFEEDB 100%)",
      minHeight: "100vh",
      py: 4,
      px: { xs: 2, md: 8 }
    }}>
      {loading ? (
        <Typography variant="h4" textAlign="center">Loading User...</Typography>
      ) : userData ? (
        <Grid container spacing={4}>
          {/* Profile Section */}
          <Grid item xs={12} md={4}>
            <SurasaPaper>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h5" mt={2} fontWeight="bold">
                  {userData.first_name}
                </Typography>
                <Typography color="textSecondary" mt={1}>
                  User ID: {userData.id}
                </Typography>

                <StatusBadge status="Active" sx={{ mt: 2 }}>
                  <CheckCircle sx={{ fontSize: 16, mr: 0.5 }} />
                  Verified Account
                </StatusBadge>
              </Box>
            </SurasaPaper>

            <SurasaPaper sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold" color="#7D4A0A">
                Loyalty Information
              </Typography>
              <Box display="flex" justifyContent="space-between">
                <Typography>Current Points:</Typography>
                <Typography fontWeight="bold" color="#E6B325">
                  {userData.loyalty_points} pts
                </Typography>
              </Box>
              <Box mt={2}>
                <Typography variant="body2" color="textSecondary">
                  Member since: {new Date(userData.created_at).toLocaleDateString()}
                </Typography>
              </Box>
            </SurasaPaper>

            <SurasaPaper
              sx={{
                mt: 3,
                display: "flex",         // Make it a flex container
                justifyContent: "center", // Horizontally center the button
                alignItems: "center",     // Vertically center if needed
              }}
            >
              <Button
                onClick={handleOrderNowClick}
                size="large"
                disableElevation
                variant="contained"
                sx={{
                  width: "100%",
                  bgcolor: brown[700],
                  paddingTop: 2,
                  paddingBottom: 2,
                  paddingX: 4,
                  "&:hover": {
                    bgcolor: "transparent",
                    borderWidth: 2,
                    borderColor: brown[800],
                    color: yellow[800],
                  },
                }}
              >
                Order Now
              </Button>
            </SurasaPaper>


          </Grid>

          {/* Editable Form Section */}
          <Grid item xs={12} md={8}>
            <SurasaPaper>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" fontWeight="bold" color="#7D4A0A">
                  Personal Details
                </Typography>
                {editMode ? (
                  <>
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<Save />}
                      onClick={handleSave}
                      sx={{ mr: 1 }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<Cancel />}
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    startIcon={<Edit />}
                    onClick={handleEditToggle}
                  >
                    Edit
                  </Button>
                )}
              </Box>

              <Grid container spacing={2}>
                {[
                  { label: "First Name", field: "first_name" },
                  { label: "Last Name", field: "last_name" },
                  { label: "Email Address", field: "email" },
                  { label: "Phone Number", field: "phone_num" }
                ].map(({ label, field }) => (
                  <Grid item xs={12} md={6} key={field}>
                    <Typography variant="subtitle1" fontWeight="bold">{label}</Typography>
                    {editMode ? (
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={editedData[field] || ""}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                      />
                    ) : (
                      <Typography>{userData[field]}</Typography>
                    )}
                  </Grid>
                ))}

                <Grid item xs={12}>
                  <Typography variant="subtitle1" fontWeight="bold">Account Status</Typography>
                  <Typography>
                    {userData.email_verified_at
                      ? "Verified (" + new Date(userData.email_verified_at).toLocaleDateString() + ")"
                      : "Not Verified"}
                  </Typography>
                </Grid>
              </Grid>
            </SurasaPaper>

            <SurasaPaper sx={{ mt: 3 }}>
              <Typography variant="h5" fontWeight="bold" mb={3} color="#7D4A0A">
                Account Information
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" fontWeight="bold">Last Updated</Typography>
                  <Typography>
                    {new Date(userData.updated_at).toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" fontWeight="bold">Account Created</Typography>
                  <Typography>
                    {new Date(userData.created_at).toLocaleDateString()}
                  </Typography>
                </Grid>
              </Grid>
            </SurasaPaper>

            {/* Review Modal */}
            <Dialog open={reviewModalOpen} onClose={handleCloseReviewModal}>
              <DialogTitle>Review Product</DialogTitle>
              <DialogContent>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Rate your experience
                  </Typography>
                  <Rating
                    value={rating}
                    onChange={(event, newValue) => setRating(newValue)}
                    precision={1}
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Add a photo (optional)
                  </Typography>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setReviewImage(e.target.files[0])}
                    style={{ marginBottom: '1rem' }}
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Write your review
                  </Typography>
                  {/* <TextareaAutosize
                    minRows={4}
                    placeholder="Share your experience..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    style={{ width: '100%', padding: '8px' }}
                    required
                  /> */}
                  <div className="relative">
                    <TextareaAutosize
                      minRows={4}
                      placeholder="Share your experience..."
                      value={comment}
                      onChange={(e) => {
                        if (e.target.value.length <= 80) {
                          setComment(e.target.value);
                        }
                      }}
                      style={{ width: '100%', padding: '8px', paddingBottom: '28px' }}
                      required
                    />
                    <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                      {comment.length}/80
                    </div>
                  </div>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseReviewModal} color="secondary">
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitReview}
                  variant="contained"
                  color="primary"
                  disabled={rating === 0}
                >
                  Submit Review
                </Button>
              </DialogActions>
            </Dialog>

            {/* Orders Section */}
            <SurasaPaper sx={{ mt: 3 }}>
              <Typography variant="h5" fontWeight="bold" mb={3} color="#7D4A0A">
                Order History
              </Typography>

              {orders.length > 0 ? (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#FFEEDB' }}>
                        <TableCell width="5%"></TableCell>
                        <TableCell width="10%"><b>Order ID</b></TableCell>
                        <TableCell width="20%"><b>Date</b></TableCell>
                        <TableCell width="15%"><b>Amount</b></TableCell>
                        <TableCell width="15%"><b>Status</b></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders.map(order => (
                        <React.Fragment key={order.id}>
                          {console.log("Order:", order.status)}
                          <TableRow hover>
                            <TableCell>
                              <IconButton
                                size="small"
                                onClick={() => toggleOrderExpansion(order.id)}
                              >
                                {expandedOrders[order.id] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                              </IconButton>
                            </TableCell>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>
                              {new Date(order.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              {formatCurrency(order.price)}
                            </TableCell>
                            <TableCell>
                              <StatusIndicator status={order.status.toLowerCase()}>
                                {order.status}
                              </StatusIndicator>
                            </TableCell>
                          </TableRow>

                          {/* Order Items Nested Table */}
                          <TableRow>
                            <TableCell colSpan={6} style={{ padding: 0, borderBottom: 'none' }}>
                              <Collapse in={expandedOrders[order.id]} timeout="auto" unmountOnExit>
                                <NestedTableContainer>
                                  <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                                    Order Items
                                  </Typography>

                                  {orderItems[order.id] ? (
                                    orderItems[order.id].length > 0 ? (
                                      <TableContainer>
                                        <Table size="small">
                                          <TableHead>
                                            <TableRow>
                                              <TableCell>Product Name</TableCell>
                                              <TableCell align="center">Quantity</TableCell>
                                              <TableCell align="right">Price</TableCell>
                                              <TableCell align="right">Total</TableCell>
                                              <TableCell align="center">Review</TableCell>
                                            </TableRow>
                                          </TableHead>
                                          <TableBody>
                                            {orderItems[order.id].map(item => (
                                              <TableRow key={item.id}>
                                                <TableCell>
                                                  <Box display="flex" alignItems="center">
                                                    <Box>
                                                      <Typography fontWeight="500">{productsMap[item.product_id] || `Product ${item.product_id}`}</Typography>
                                                    </Box>
                                                  </Box>
                                                </TableCell>
                                                <TableCell align="center">{item.quantity}</TableCell>
                                                <TableCell align="right">{formatCurrency(item.price)}</TableCell>
                                                <TableCell align="right">
                                                  {formatCurrency(item.price * item.quantity)}
                                                </TableCell>
                                                <TableCell align="center">
                                                  {isReviewAlreadySubmitted(item.order_id, item.product_id) ? (
                                                    <Typography variant="body2" color="textSecondary">
                                                      Review Submitted
                                                    </Typography>
                                                  ) : (
                                                    <Button
                                                      variant="outlined"
                                                      size="small"
                                                      onClick={() => handleOpenReviewModal(item)}
                                                      disabled={order.status !== "Completed"} // disables unless status is "Completed"
                                                    >
                                                      Review
                                                    </Button>
                                                  )}
                                                  {console.log("Order ID", order.id)}
                                                  {console.log("Item ID", item.product_id)}
                                                  {console.log("isReviewAlreadySubmitted", isReviewAlreadySubmitted(order.id, item.product_id))}
                                                </TableCell>
                                              </TableRow>
                                            ))}
                                          </TableBody>
                                        </Table>
                                      </TableContainer>
                                    ) : (
                                      <Typography variant="body2" textAlign="center" py={2}>
                                        No items found for this order
                                      </Typography>
                                    )
                                  ) : (
                                    <Box textAlign="center" py={2}>
                                      <Typography variant="body2">No items found for this order</Typography>
                                    </Box>
                                  )}
                                </NestedTableContainer>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        </React.Fragment>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Box textAlign="center" py={4}>
                  <Typography variant="body1" color="textSecondary">
                    No orders found for this user
                  </Typography>
                </Box>
              )}
            </SurasaPaper>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h5" textAlign="center" py={10}>
          User not found
        </Typography>
      )}
    </Box>
  );
};

const mapStateToProps = ({ user }) => ({ currentUser: user.currentUser });
const mapDispatchToProps = { setCurrentUser };

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);