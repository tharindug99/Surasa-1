import React from "react";

function OrderStatistics({ orderCount, rejectedCount, completedCount, deliveredCount }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 w-4/5">
            <div className="bg-teal-600 p-4 rounded-md text-white flex flex-col justify-between">
                <div>Total Orders</div>
                <div className="text-4xl text-right md:text-right sm:text-right pt-10">
                    {orderCount}
                </div>
            </div>
            <div className="bg-purple-600 p-4 rounded-md text-white flex flex-col justify-between">
                <div>Completed Orders</div>
                <div className="text-4xl text-right md:text-right sm:text-right pt-10">
                    {completedCount}
                </div>
            </div>
            <div className="bg-blue-600 p-4 rounded-md text-white flex flex-col justify-between">
                <div>Orders Currently in Delivery</div>
                <div className="text-4xl text-right md:text-right sm:text-right pt-10">
                    {deliveredCount}
                </div>
            </div>
            <div className="bg-red-600 p-4 rounded-md text-white flex flex-col justify-between">
                <div>Cancelled Orders</div>
                <div className="text-4xl text-right md:text-right sm:text-right pt-10">
                    {rejectedCount}
                </div>
            </div>

        </div>
    );
}

export default OrderStatistics;
