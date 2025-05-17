import React from "react";

function MainStatistics({ userCount, bookingCount, orderCount, reviewCount }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 w-4/5">
      <div className="bg-teal-600 p-4 rounded-md text-white flex flex-col justify-between">
        <div>Total Users Registered</div>
        <div className="text-4xl text-right md:text-right sm:text-right pt-10">
          {userCount}
        </div>
      </div>
      <div className="bg-purple-600 p-4 rounded-md text-white flex flex-col justify-between">
        <div>Booking Requests</div>
        <div className="text-4xl text-right md:text-right sm:text-right pt-10">
          {bookingCount}
        </div>
      </div>
      <div className="bg-red-600 p-4 rounded-md text-white flex flex-col justify-between">
        <div>Orders</div>
        <div className="text-4xl text-right md:text-right sm:text-right pt-10">
          {orderCount}
        </div>
      </div>
      <div className="bg-blue-600 p-4 rounded-md text-white flex flex-col justify-between">
        <div>Customer Reviews</div>
        <div className="text-4xl text-right md:text-right sm:text-right pt-10">
          {reviewCount}
        </div>
      </div>
    </div>
  );
}

export default MainStatistics;
