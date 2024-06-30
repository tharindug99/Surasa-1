import React from 'react';
import { connect } from 'react-redux';
import { setOrders } from 'redux/actions'; // You need to create setOrders action
import OrderRequest from 'services/Requests/Order'; // You need to create OrderRequest
import { useEffect } from 'react';
import useLoading from 'hooks/useLoading';

const Order = props => {
  const { setOrders, orders } = props; // Add orders to props
  const [loading, withLoading] = useLoading();

  const getAllOrders = async () => { // New function for fetching all orders
    try {
      const orders = await withLoading(OrderRequest.getAllOrders()); // Use getAllOrders function
      setOrders(orders?.data);
      console.log(orders?.data); // Console log the orders
    } catch (error) {
      console.log(error?.message);
      console.error(error);
    }
  }

  useEffect(() => {
    if(orders?.length < 1){ // Fetch orders if not already fetched
      getAllOrders();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {
        loading
          ? "Loading Orders"
          : <h4>Check console for orders data</h4>
      }
    </>
  )
};

const mapStateToProps = ({order}) => { // Add order to mapStateToProps
  const { orders } = order; // You need to create order reducer
  return { orders }
}

const mapDispatchToProps = {
  setOrders // You need to create setOrders action
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);