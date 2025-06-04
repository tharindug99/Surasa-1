import useLoading from 'hooks/useLoading';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setCurrentUser } from 'redux/actions';
import UserRequest from 'services/Requests/User';
import OrderRequest from 'services/Requests/Order';
import {
  Box, Grid, Paper, Typography, Avatar, Button, TextField
} from "@mui/material";
import { styled } from "@mui/system";
import { CheckCircle, Edit, Save, Cancel } from "@mui/icons-material";

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

const UserDetail = props => {
  const { setCurrentUser } = props;
  const [loading, withLoading] = useLoading();
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [userOrders, setUserOrders] = useState([]);


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
      setUserOrders(filteredOrders || ["No Orders"]);
      console.log(userOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
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
      const response = await withLoading(UserRequest.updateAUser(id, editedData));
      setUserData(response);
      setCurrentUser(response);
      setEditMode(false);
      console.log('Edited Data:', editedData, typeof editedData);
    } catch (error) {
      console.log('Edited Data:', editedData, typeof editedData);
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    handleGetUser();
    handleGetOrders();
  }, []);

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
                <Avatar
                  src={userData.image || "https://placehold.co/120x120"}
                  sx={{
                    width: 120,
                    height: 120,
                    border: "3px solid #E6B325",
                  }}
                />
                <Typography variant="h5" mt={2} fontWeight="bold">
                  {userData.first_name} {userData.last_name}
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
