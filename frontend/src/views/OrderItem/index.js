// frontend/src/views/OrderItem/index.js

import React from 'react';
import { connect } from 'react-redux';
import { setOrderItems } from 'redux/actions'; // You need to create setOrderItems action
import OrderItemRequest from 'services/Requests/OrderItem'; // You need to create OrderItemRequest
import { useEffect } from 'react';
import useLoading from 'hooks/useLoading';

const OrderItem = props => {
  const { setOrderItems, orderItems } = props; // Add orderItems to props
  const [loading, withLoading] = useLoading();

  const getAllOrderItems = async () => { // New function for fetching all order items
    try {
      const orderItems = await withLoading(OrderItemRequest.getAllOrderItems()); // Use getAllOrderItems function
      setOrderItems(orderItems?.data);
      console.log(orderItems?.data); // Console log the order items
    } catch (error) {
      console.log(error?.message);
      console.error(error);
    }
  }

  useEffect(() => {
    if(orderItems?.length < 1){ // Fetch order items if not already fetched
      getAllOrderItems();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {
        loading
          ? "Loading Order Items"
          : <h4>Check console for order items data</h4>
      }
    </>
  )
};

const mapStateToProps = ({orderItem}) => { // Add orderItem to mapStateToProps
  const { orderItems } = orderItem; // You need to create orderItem reducer
  return { orderItems }
}

const mapDispatchToProps = {
  setOrderItems // You need to create setOrderItems action
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderItem);