import React from 'react';
import { connect } from 'react-redux';
import { setOrders } from 'redux/actions'; // You need to create setOrders action
import OrderRequest from 'services/Requests/Order'; // You need to create OrderRequest
import { useEffect } from 'react';
import useLoading from 'hooks/useLoading';
import OrderStatistics from 'components/OrderMenu/OrderStatistics';
import PendingOrdersTable from 'components/OrderMenu/Tables/PendingOrderTable';
import ReadyOrdersTable from 'components/OrderMenu/Tables/ReadyOrderTable';
import OutforDeliveryTable from 'components/OrderMenu/Tables/OutforDeliveryOrderTable';
import FinalizedOrdersTable from 'components/OrderMenu/Tables/FinalizedOrderTable';
import ProcessingOrdersTable from 'components/OrderMenu/Tables/ProcessingOrderTable';


const Order = props => {
  const { setOrders, orders } = props; // Add orders to props
  const [loading, withLoading] = useLoading();
  const [orderCount, setOrderCount] = React.useState(0);
  const [rejectedCount, setRejectedCount] = React.useState(0);
  const [completedCount, setCompletedCount] = React.useState(0);
  const [deliveredCount, setDeliveredCount] = React.useState(0);

  const getAllOrders = async () => {
    try {
      const response = await withLoading(OrderRequest.getAllOrders());
      const ordersData = response?.data || [];

      if (Array.isArray(ordersData)) {
        setOrders(ordersData);
        setOrderCount(ordersData.length);

        // Calculate status counts
        const rejected = ordersData.filter(order => order.status === 'Rejected').length;
        const completed = ordersData.filter(order => order.status === 'Completed').length;
        const delivered = ordersData.filter(order => order.status === 'Delivered').length;

        setRejectedCount(rejected);
        setCompletedCount(completed);
        setDeliveredCount(delivered);

        console.log('Orders data:', ordersData);
      } else {
        // Reset counts if invalid data
        setOrderCount(0);
        setRejectedCount(0);
        setCompletedCount(0);
        setDeliveredCount(0);
      }
    } catch (error) {
      console.error('Error fetching orders:', error?.message);
      // Reset counts on error
      setOrderCount(0);
      setRejectedCount(0);
      setCompletedCount(0);
      setDeliveredCount(0);
    }
  };

  useEffect(() => {
    if (orders?.length < 1) { // Fetch orders if not already fetched
      getAllOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {
        loading
          ? "Loading Orders"
          : <h4>Orders</h4>
      }
      <OrderStatistics
        orderCount={orderCount} // Replace with actual user count
        rejectedCount={rejectedCount} // Replace with actual booking count
        completedCount={completedCount} // Use orders length
        deliveredCount={deliveredCount} // Replace with actual review count
      />

      {/* -------------------Pending Orders----------------------- */}
      <div className="flex justify-between items-center mt-6">
        <h2 className="text-xl font-semibold">Pending Orders</h2>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => getAllOrders()}
        >
          Refresh Orders
        </button>
      </div>
      <div className="flex flex-col w-full mt-6">
        <div className="overflow-x-auto">
          <PendingOrdersTable orders={orders} />


        </div>
      </div>

      {/* -------------------Processing Orders----------------------- */}

      <div className="flex justify-between items-center mt-6">
        <h2 className="text-xl font-semibold">Processing Orders</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => getAllOrders()}
        >
          Refresh Orders
        </button>
      </div>
      <div className="flex flex-col w-full mt-6">
        <div className="overflow-x-auto">
          <ProcessingOrdersTable orders={orders} />
        </div>
      </div>

      {/* -------------------Ready Orders----------------------- */}

      <div className="flex justify-between items-center mt-6">
        <h2 className="text-xl font-semibold">Ready Orders</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => getAllOrders()}
        >
          Refresh Orders
        </button>
      </div>
      <div className="flex flex-col w-full mt-6">
        <div className="overflow-x-auto">
          <ReadyOrdersTable orders={orders} />
        </div>
      </div>

      {/* -------------------Out for Delivery Orders----------------------- */}
      <div className="flex justify-between items-center mt-6">
        <h2 className="text-xl font-semibold">Out for Delivery Orders</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => getAllOrders()}
        >
          Refresh Orders
        </button>
      </div>
      <div className="flex flex-col w-full mt-6">
        <div className="overflow-x-auto">
          <OutforDeliveryTable orders={orders} />
        </div>
      </div>

      {/* -------------------Completed/Cancelled Orders----------------------- */}
      <div className="flex justify-between items-center mt-6">
        <h2 className="text-xl font-semibold">Completed/Cancelled Orders</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => getAllOrders()}
        >
          Refresh Orders
        </button>
      </div>
      <div className="flex flex-col w-full mt-6">
        <div className="overflow-x-auto">
          <FinalizedOrdersTable orders={orders} />
        </div>
      </div>
    </>
  )
};

const mapStateToProps = ({ order }) => {
  const { orders } = order;
  return { orders };
};

const mapDispatchToProps = {
  setOrders // You need to create setOrders action
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);