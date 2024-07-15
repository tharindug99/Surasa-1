import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setUsers } from "redux/actions"; // You need to create setUsers action
import UserRequest from "services/Requests/User"; // You need to create UserRequest
import useLoading from "hooks/useLoading";
import CollapsibleTable from "./CustomerTableUI";
import PointsModal from "./PointsModal"; // Import PointsModal component

const User = (props) => {
  const { setUsers, users } = props; // Add users to props
  const [loading, withLoading] = useLoading();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isAddingPoints, setIsAddingPoints] = useState(true);

  const getAllUsers = async () => {
    // New function for fetching all users
    try {
      const response = await withLoading(UserRequest.getAllUsers()); // Use getAllUsers function
      setUsers(response?.data);
      console.log(response?.data); // Console log the users
    } catch (error) {
      console.log(error?.message);
      console.error(error);
    }
  };

  const handleOpenModal = (userId, isAdding) => {
    setCurrentUserId(userId);
    setIsAddingPoints(isAdding);
    setModalOpen(true);
  };

  const handleAddPoints = async (userId, points) => {
    try {
      const response = await UserRequest.addPoints(userId, points);
      getAllUsers(); // Refresh the users list
    } catch (error) {
      console.log(error?.message);
      console.error(error);
    }
  };

  const handleDeductPoints = async (userId, points) => {
    try {
      const response = await UserRequest.deductPoints(userId, points);
      getAllUsers(); // Refresh the users list
    } catch (error) {
      console.log(error?.message);
      console.error(error);
    }
  };

  useEffect(() => {
    if (users?.length < 1) {
      // Fetch users if not already fetched
      getAllUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            handleAddPoints={handleAddPoints}
            handleDeductPoints={handleDeductPoints}
          />
        </>
      )}
    </>
  );
};

const mapStateToProps = ({ user }) => {
  // Add user to mapStateToProps
  const { users } = user; // You need to create user reducer
  return { users };
};

const mapDispatchToProps = {
  setUsers, // You need to create setUsers action
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
