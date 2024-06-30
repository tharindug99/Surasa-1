// frontend/src/views/DailyMenu/index.js

import React from 'react';
import { connect } from 'react-redux';
import { setDailyMenuItems } from 'redux/actions'; // You need to create setDailyMenuItems action
import DailyMenuItemRequest from 'services/Requests/DailyMenuItem'; // You need to create DailyMenuItemRequest
import { useEffect } from 'react';
import useLoading from 'hooks/useLoading';

const DailyMenu = props => {
  const { setDailyMenuItems, dailyMenuItems } = props; // Add dailyMenuItems to props
  const [loading, withLoading] = useLoading();

  const getAllDailyMenuItems = async () => { // New function for fetching all daily menu items
    try {
      const dailyMenuItems = await withLoading(DailyMenuItemRequest.getAllDailyMenuItem()); // Use getAllDailyMenuItems function
      setDailyMenuItems(dailyMenuItems?.data);
      console.log(dailyMenuItems?.data); // Console log the daily menu items
    } catch (error) {
      console.log(error?.message);
      console.error(error);
    }
  }

  useEffect(() => {
    if(dailyMenuItems?.length < 1){ // Fetch daily menu items if not already fetched
      getAllDailyMenuItems();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {
        loading
          ? "Loading Daily Menu Items"
          : <h4>Check console for daily menu items data</h4>
      }
    </>
  )
};

const mapStateToProps = ({dailyMenuItem}) => { // Changed dailyMenu to dailyMenuItem
  const { dailyMenuItems } = dailyMenuItem; // You need to create dailyMenu reducer
  return { dailyMenuItems }
}

const mapDispatchToProps = {
  setDailyMenuItems // You need to create setDailyMenuItems action
}

export default connect(mapStateToProps, mapDispatchToProps)(DailyMenu);