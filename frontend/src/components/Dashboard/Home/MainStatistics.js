import React from "react";

function MainStatistics() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 w-4/5">
      <div className="bg-teal-600 p-4 rounded-md text-white flex flex-col justify-between">
        <div>Total Users Registered</div>
        <div className="text-4xl text-right md:text-right sm:text-right pt-10">
          100
        </div>
      </div>
      <div className="bg-purple-600 p-4 rounded-md text-white flex flex-col justify-between">
        <div>Booking Requests</div>
        <div className="text-4xl text-right md:text-right sm:text-right pt-10">
          100
        </div>
      </div>
      <div className="bg-red-600 p-4 rounded-md text-white flex flex-col justify-between">
        <div>Orders</div>
        <div className="text-4xl text-right md:text-right sm:text-right pt-10">
          <p>100</p>
        </div>
      </div>
      <div className="bg-blue-600 p-4 rounded-md text-white flex flex-col justify-between">
        <div>Total Users Registered</div>
        <div className="text-4xl text-right md:text-right sm:text-right pt-10">
          100
        </div>
      </div>
    </div>
  );
}

export default MainStatistics;
