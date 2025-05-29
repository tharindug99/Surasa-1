import React from 'react';
import { connect } from 'react-redux';
import { setOrders, setOrderItems } from 'redux/actions'; // You need to create setOrders action
import OrderRequest from 'services/Requests/Order';
import OrderItemRequest from 'services/Requests/OrderItem';
import { useEffect } from 'react';
import useLoading from 'hooks/useLoading';
import OrderStatistics from 'components/OrderMenu/OrderStatistics';
import PendingOrdersTable from 'components/OrderMenu/Tables/PendingOrderTable';
import ReadyOrdersTable from 'components/OrderMenu/Tables/ReadyOrderTable';
import OutforDeliveryTable from 'components/OrderMenu/Tables/OutforDeliveryOrderTable';
import FinalizedOrdersTable from 'components/OrderMenu/Tables/FinalizedOrderTable';
import ProcessingOrdersTable from 'components/OrderMenu/Tables/ProcessingOrderTable';

const Order = props => {
  const { setOrders, orders = [], orderItems = {}, setOrderItems } = props;
  const [loading, withLoading] = useLoading();
  const [orderCount, setOrderCount] = React.useState(0);
  const [rejectedCount, setRejectedCount] = React.useState(0);
  const [completedCount, setCompletedCount] = React.useState(0);
  const [deliveredCount, setDeliveredCount] = React.useState(0);

  const getAllOrders = async () => {
    try {
      const [ordersRes, itemsRes] = await withLoading(
        Promise.all([
          OrderRequest.getAllOrders(),
          OrderItemRequest.getAllOrderItems()
        ])
      );

      const ordersData = ordersRes?.data || [];
      const itemsData = itemsRes?.data || [];

      console.log("Orders data:", ordersData);
      console.log("Items data:", itemsData);

      // Group items by order_id
      const groupedItems = itemsData.reduce((acc, item) => {
        const orderId = item.order_id;
        if (!acc[orderId]) acc[orderId] = [];
        acc[orderId].push(item);
        return acc;
      }, {});

      console.log("Grouped items:", groupedItems);

      // Calculate totals
      const ordersWithTotals = ordersData.map(order => {
        const items = groupedItems[order.id] || [];
        const total = items.reduce((sum, item) => sum + parseFloat(item.total_cost || 0), 0);
        return { ...order, total };
      });

      // Update Redux
      setOrders(ordersWithTotals);
      setOrderItems(groupedItems);

      // Update counts
      setOrderCount(ordersData.length);
      setRejectedCount(ordersData.filter(order => order.status === 'Rejected').length);
      setCompletedCount(ordersData.filter(order => order.status === 'Completed').length);
      setDeliveredCount(ordersData.filter(order => order.status === 'Delivered').length);

      console.log("Redux state updated:", {
        orders: ordersWithTotals,
        orderItems: groupedItems
      });

      console.log("orderItems", orderItems)

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
    // Fetch if orders are empty or not loaded
    if (!orders || orders.length === 0) {
      getAllOrders();
    }
  }, []);

  return (
    <>
      {loading ? "Loading Orders..." : <h4>Orders</h4>}

      <OrderStatistics
        orderCount={orderCount}
        rejectedCount={rejectedCount}
        completedCount={completedCount}
        deliveredCount={deliveredCount}
      />

      {/* Pending Orders */}
      <div className="flex justify-between items-center mt-6">
        <h2 className="text-xl font-semibold">Pending Orders</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={getAllOrders}
        >
          Refresh Orders
        </button>
      </div>
      <div className="flex flex-col w-full mt-6">
        <div className="overflow-x-auto">
          <PendingOrdersTable
            orders={orders.filter(order => order.status === 'Pending')}
            orderItems={orderItems}
          />
        </div>
      </div>

      {/* Processing Orders */}
      <div className="flex justify-between items-center mt-6">
        <h2 className="text-xl font-semibold">Processing Orders</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={getAllOrders}
        >
          Refresh Orders
        </button>
      </div>
      <div className="flex flex-col w-full mt-6">
        <div className="overflow-x-auto">
          <ProcessingOrdersTable
            orders={orders.filter(order => order.status === 'Processing')}
            orderItems={orderItems}
          />
        </div>
      </div>

      {/* Ready Orders */}
      <div className="flex justify-between items-center mt-6">
        <h2 className="text-xl font-semibold">Ready Orders</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={getAllOrders}
        >
          Refresh Orders
        </button>
      </div>
      <div className="flex flex-col w-full mt-6">
        <div className="overflow-x-auto">
          <ReadyOrdersTable
            orders={orders.filter(order => order.status === 'Ready')}
            orderItems={orderItems}
          />
        </div>
      </div>

      {/* Out for Delivery Orders */}
      <div className="flex justify-between items-center mt-6">
        <h2 className="text-xl font-semibold">Out for Delivery Orders</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={getAllOrders}
        >
          Refresh Orders
        </button>
      </div>
      <div className="flex flex-col w-full mt-6">
        <div className="overflow-x-auto">
          <OutforDeliveryTable
            orders={orders.filter(order => order.status === 'Out for Delivery')}
            orderItems={orderItems}
          />
        </div>
      </div>

      {/* Completed/Cancelled Orders */}
      <div className="flex justify-between items-center mt-6">
        <h2 className="text-xl font-semibold">Completed/Cancelled Orders</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={getAllOrders}
        >
          Refresh Orders
        </button>
      </div>
      <div className="flex flex-col w-full mt-6">
        <div className="overflow-x-auto">
          <FinalizedOrdersTable
            orders={orders.filter(order =>
              order.status === 'Completed' || order.status === 'Cancelled'
            )}
            orderItems={orderItems}
          />
        </div>
      </div>
    </>
  )
};

const mapStateToProps = (state) => {
  // Add debug log to verify state structure
  console.log("Redux state:", state);
  return {
    orders: state.order.orders || [],
    orderItems: state.order.orderItems || {}
  };
};

const mapDispatchToProps = {
  setOrders,
  setOrderItems
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);