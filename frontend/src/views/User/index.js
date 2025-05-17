import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setUsers as setUsersAction,
  updateUserLoyaltyPoints
} from "redux/actions/User";
import UserRequest from "services/Requests/User";
import useLoading from "hooks/useLoading";
import CollapsibleTable from "./CustomerTableUI";
import PointsModal from "./PointsModal";

const User = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [loading, withLoading] = useLoading();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isAddingPoints, setIsAddingPoints] = useState(true);

  const getAllUsers = async () => {
    try {
      const response = await withLoading(UserRequest.getAllUsers());
      dispatch(setUsersAction(response?.data));
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const handleOpenModal = (userId, isAdding) => {
    setCurrentUserId(userId);
    setIsAddingPoints(isAdding);
    setModalOpen(true);
  };

  const handlePointsChange = async (userId, points, isAdding) => {
    try {
      const pointsValue = parseInt(points);
      if (isNaN(pointsValue)) {
        console.error("Invalid points value");
        return;
      }

      const response = isAdding
        ? await UserRequest.addLoyaltyPoints(userId, pointsValue)
        : await UserRequest.deductLoyaltyPoints(userId, pointsValue);

      // Update Redux store with the modified user
      dispatch(updateUserLoyaltyPoints(
        response.data.user,
        pointsValue,
        isAdding ? 'ADD_LOYALTY_POINTS' : 'DEDUCT_LOYALTY_POINTS'
      ));

      setModalOpen(false);
    } catch (error) {
      console.error("Failed to update points:", error);
    }
  };

  useEffect(() => {
    if (users.length < 1) {
      getAllUsers();
    }
  }, [users.length]);

  return (
    <>
      {loading ? (
        "Loading Users"
      ) : (
        <>
          <div>
            <CollapsibleTable rows={users} handleOpenModal={handleOpenModal} />
          </div>
          // In User component's return statement
          <PointsModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            userId={currentUserId}
            isAdding={isAddingPoints}
            handleSubmit={handlePointsChange}  // Single handler for both operations
          />
        </>
      )}
    </>
  );
};

export default User;