// frontend/src/views/User/index.js

import React from 'react';
import { connect } from 'react-redux';
import { setUsers } from 'redux/actions'; // You need to create setUsers action
import UserRequest from 'services/Requests/User'; // You need to create UserRequest
import { useEffect } from 'react';
import useLoading from 'hooks/useLoading';

const User = props => {
  const { setUsers, users } = props; // Add users to props
  const [loading, withLoading] = useLoading();

  const getAllUsers = async () => { // New function for fetching all users
    try {
      const users = await withLoading(UserRequest.getAllUsers()); // Use getAllUsers function
      setUsers(users?.data);
      console.log(users?.data); // Console log the users
    } catch (error) {
      console.log(error?.message);
      console.error(error);
    }
  }

  useEffect(() => {
    if(users?.length < 1){ // Fetch users if not already fetched
      getAllUsers();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {
        loading
          ? "Loading Users"
          : <h4>Check console for users data</h4>
      }
    </>
  )
};

const mapStateToProps = ({user}) => { // Add user to mapStateToProps
  const { users } = user; // You need to create user reducer
  return { users }
}

const mapDispatchToProps = {
  setUsers // You need to create setUsers action
}

export default connect(mapStateToProps, mapDispatchToProps)(User);