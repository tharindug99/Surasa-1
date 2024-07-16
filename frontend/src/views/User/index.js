import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUsers as setUsersAction } from "redux/actions"; // Assuming actions are properly defined
import UserRequest from "services/Requests/User"; // Assuming UserRequest is properly defined
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
      const response = isAdding
        ? await UserRequest.addPoints(userId, points)
        : await UserRequest.deductPoints(userId, points);
      getAllUsers(); // Refresh the users list after updating points
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
          <PointsModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            userId={currentUserId}
            isAdding={isAddingPoints}
            handleAddPoints={(userId, points) => handlePointsChange(userId, points, true)}
            handleDeductPoints={(userId, points) => handlePointsChange(userId, points, false)}
          />
        </>
      )}
    </>
  );
};

export default User;