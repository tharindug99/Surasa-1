import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setUsers as setUsersAction,
  updateUserLoyaltyPoints,
  removeUser,
  addUser
} from "redux/actions/User";
import UserRequest from "services/Requests/User";
import useLoading from "hooks/useLoading";
import CollapsibleTable from "./CustomerTableUI";
import PointsModal from "./PointsModal";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import Toaster from "../../components/Toaster/Toaster";
import { Button, Dialog, DialogTitle, DialogContent, Typography, DialogActions } from "@mui/material";

const FloatingButton = styled(Fab)({
  position: "fixed",
  bottom: 32,
  right: 32,
});

const User = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [loading, withLoading] = useLoading();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isAddingPoints, setIsAddingPoints] = useState(true);
  const [showToaster, setShowToaster] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");
  const [toasterType, setToasterType] = useState("error");

  // Modal Handlers
  const handleUserOpenModal = () => setUserModalOpen(true);
  const handleUserCloseModal = () => setUserModalOpen(false);
  const handleDeleteConfirmOpen = () => setDeleteConfirmModalOpen(true);
  const handleDeleteConfirmClose = () => setDeleteConfirmModalOpen(false);

  const [modalData, setModalData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_num: '',
    loyalty_points: '',
    password: '',
    avatar: null
  });

  const getAllUsers = async () => {
    try {
      const response = await withLoading(UserRequest.getAllUsers());
      dispatch(setUsersAction(response?.data));
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const handleAddUser = async () => {
    try {
      const formData = new FormData();
      formData.append("first_name", modalData.first_name);
      formData.append("last_name", modalData.last_name);
      formData.append("email", modalData.email);
      formData.append("phone_num", modalData.phone_num);
      formData.append("password", modalData.password);
      if (modalData.avatar) {
        formData.append("avatar", modalData.avatar);
      }

      const response = await UserRequest.addAUser(formData);
      dispatch(addUser(response.data));
      setToasterMessage('User added successfully');
      setToasterType('success');
      setShowToaster(true);
      await getAllUsers();
      handleUserCloseModal();
    } catch (error) {
      console.error("Failed to add user:", error);
      setToasterMessage(error.response?.data?.message || 'Failed to add user');
      setToasterType('error');
      setShowToaster(true);
    }
  };

  const handleOpenModal = (userId, isAdding) => {
    setCurrentUserId(userId);
    setIsAddingPoints(isAdding);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    await handleDeleteUser();
    setDeleteConfirmModalOpen(false);
    setCurrentUserId(null);
  };

  const handleDeleteClick = (userId) => {
    setCurrentUserId(userId);
    setDeleteConfirmModalOpen(true);
  };

  const handleDeleteUser = async () => {
    try {
      if (!currentUserId) return;

      await UserRequest.deleteAUser(currentUserId);
      dispatch(removeUser(currentUserId));
      await getAllUsers();
      setToasterMessage('User deleted successfully');
      setToasterType('success');
      setShowToaster(true);
    } catch (error) {
      console.error("Failed to delete user:", error);
      setToasterMessage(error.response?.data?.error || 'Failed to delete user');
      setToasterType('error');
      setShowToaster(true);
    }
  };

  const handlePointsChange = async (userId, points, isAdding) => {
    try {
      const pointsValue = parseInt(points);
      if (isNaN(pointsValue)) return;

      const response = isAdding
        ? await UserRequest.addLoyaltyPoints(userId, pointsValue)
        : await UserRequest.deductLoyaltyPoints(userId, pointsValue);

      dispatch(updateUserLoyaltyPoints(
        response.data.user,
        pointsValue,
        isAdding ? 'ADD_LOYALTY_POINTS' : 'DEDUCT_LOYALTY_POINTS'
      ));
      setToasterMessage(`Loyalty points ${isAdding ? 'added' : 'deducted'} successfully`);
      setToasterType('success');
      setShowToaster(true);

      setModalOpen(false);
    } catch (error) {
      console.error("Failed to update points:", error);
      setToasterMessage(error.response?.data?.error || 'Failed to update points');
      setToasterType('error');
      setShowToaster(true);
    }
  };

  useEffect(() => {
    if (users.length < 1) {
      getAllUsers();
    }
  }, [users.length]);

  const handleInputChange = (field) => (e) => {
    setModalData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setModalData(prev => ({
        ...prev,
        avatar: file
      }));
    }
  };

  return (
    <>
      {loading ? (
        "Loading Users"
      ) : (
        <>
          <div>
            <CollapsibleTable
              rows={users}
              handleOpenModal={handleOpenModal}
              onDeleteUser={handleDeleteClick}
            />
          </div>

          <PointsModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            userId={currentUserId}
            isAdding={isAddingPoints}
            handleSubmit={handlePointsChange}
          />

          <FloatingButton
            color="primary"
            aria-label="add"
            onClick={handleUserOpenModal}
          >
            <AddIcon />
          </FloatingButton>

          {showToaster && (
            <Toaster
              message={toasterMessage}
              type={toasterType}
              onClose={() => setShowToaster(false)}
            />
          )}

          {userModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-10 rounded-md shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-semibold mb-4 text-black">Add New User</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleAddUser(); }}>
                  <div className="mb-4 flex gap-4">
                    <div className="w-1/2">
                      <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                      <input
                        type="text"
                        value={modalData.first_name}
                        onChange={handleInputChange('first_name')}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                        required
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                      <input
                        type="text"
                        value={modalData.last_name}
                        onChange={handleInputChange('last_name')}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                      type="email"
                      value={modalData.email}
                      onChange={handleInputChange('email')}
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={modalData.phone_num}
                      onChange={handleInputChange('phone_num')}
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input
                      type="password"
                      value={modalData.password}
                      onChange={handleInputChange('password')}
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Profile Picture</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                    >
                      Create User
                    </button>
                    <button
                      type="button"
                      onClick={handleUserCloseModal}
                      className="text-gray-500 hover:text-gray-700 font-bold py-2 px-4 rounded focus:outline-none"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* {deleteConfirmModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4 text-black">Confirm Delete</h2>
                <p className="mb-6">Are you sure you want to delete this user? This action cannot be undone.</p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => {
                      setDeleteConfirmModalOpen(false);
                      setCurrentUserId(null);
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    className="px-4 py-2 bg-red-500 text-white font-medium rounded hover:bg-red-600"
                  >
                    Delete User
                  </button>
                </div>
              </div>
            </div>
          )} */}

          <Dialog open={deleteConfirmModalOpen} onClose={() => setDeleteConfirmModalOpen(false)}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Are you sure you want to delete this user?
              </Typography>
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                This action cannot be undone.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteConfirmModalOpen(false)}>Cancel</Button>
              <Button
                onClick={handleConfirmDelete}
                color="error"
                variant="contained"
              >
                Delete User
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
};

export default User;