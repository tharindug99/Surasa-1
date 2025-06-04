import useLoading from 'hooks/useLoading';
import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setCurrentUser } from 'redux/actions';
import UserRequest from 'services/Requests/User';
import {
  Box, Grid, Paper, Typography, Avatar
} from "@mui/material";
import { styled } from "@mui/system";
import { CheckCircle } from "@mui/icons-material";

// Styled components from UserDashboard
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
  const [userData, setUserData] = React.useState(null);

  const handleGetUser = async () => {
    try {
      const response = await withLoading(UserRequest.getAUser(id));
      setUserData(response?.data);
      setCurrentUser(response?.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    handleGetUser();
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

            {/* Loyalty Points */}
            <SurasaPaper sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold" color="#7D4A0A">
                Loyalty Information
              </Typography>
              <Box display="flex" alignItems="center" justifyContent="space-between">
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

          {/* Main Content */}
          <Grid item xs={12} md={8}>
            {/* Personal Details */}
            <SurasaPaper>
              <Typography variant="h5" fontWeight="bold" mb={3} color="#7D4A0A">
                Personal Details
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" fontWeight="bold">Name</Typography>
                  <Typography>{userData.first_name}</Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" fontWeight="bold">Email Address</Typography>
                  <Typography>{userData.email}</Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" fontWeight="bold">Phone Number</Typography>
                  <Typography>{userData.phone_num}</Typography>
                </Grid>

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

            {/* Additional Information */}
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

const mapStateToProps = ({ user }) => {
  const { currentUser } = user;
  return { currentUser };
};

const mapDispatchToProps = {
  setCurrentUser
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);