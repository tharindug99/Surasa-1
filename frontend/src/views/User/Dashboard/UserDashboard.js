import React from "react";
import ProfilePic from "../../../assets/vectors/profilePic.png";

function UserDashboard() {
  return (
    <>
      <div className=" flex h-screen ">
        {/* Left Navigation Bar */}
        <div className="bg-gray-700 lg:w-1/6 lg:flex md:flex hidden">
          <div className="m-5">
            <img src={ProfilePic} alt="Profile Pic" className="rounded-full" />
          </div>
        </div>

        <div className="bg-yellow-700 lg:w-5/6 lg:flex md:flex hidden">
            <div className="flex flex-col">
                <div className="col">
                Personal Details
                </div>
                
            </div>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
