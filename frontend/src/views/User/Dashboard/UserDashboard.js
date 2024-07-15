import React, { useState } from "react";
import ProfilePic from "../../../assets/vectors/profilePic.png";

function UserDashboard() {
  const [profilePic, setProfilePic] = useState(ProfilePic);
  const [userData, setUserData] = useState({
    fullName: "John Doe",
    contactNumber: "123-456-7890",
    email: "john.doe@example.com",
    password: "password123",
    loyaltyPoints: 150,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Navigation Bar */}
      <div className="bg-SurasaBrown w-1/6 hidden lg:flex h-screen -z-0">
        <div className="m-5">
          <img src={profilePic} alt="Profile Pic" className="rounded-full" />
          <label className="block mt-5 text-white">
            Upload Profile Picture:
            <input
              type="file"
              onChange={handleProfilePicChange}
              className="block w-full mt-1"
            />
          </label>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-SurasaYellow w-full flex flex-col items-center justify-start p-5 gap-5 overflow-y-auto">
        <div className="bg-white w-full p-5">
          <h2 className="text-lg font-bold mb-4 text-center text-yellow-800">
            Personal Details
          </h2>
          <label className="block mb-2">
            Full Name:
            <input
              type="text"
              name="fullName"
              value={userData.fullName}
              onChange={handleInputChange}
              className="block w-full mt-1"
            />
          </label>
          <label className="block mb-2">
            Contact Number:
            <input
              type="text"
              name="contactNumber"
              value={userData.contactNumber}
              onChange={handleInputChange}
              className="block w-full mt-1"
            />
          </label>
          <label className="block mb-2">
            Email:
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="block w-full mt-1"
            />
          </label>
          <label className="block mb-2">
            Password:
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              className="block w-full mt-1"
            />
          </label>
          <label className="block mb-2">
            Loyalty Points:
            <input
              type="text"
              name="loyaltyPoints"
              value={userData.loyaltyPoints}
              readOnly
              className="block w-full mt-1 bg-gray-200"
            />
          </label>
        </div>

        <div className="bg-white w-full p-5">
          <h2 className="text-lg font-bold mb-4 text-center bg text-yellow-800">
            Order History
          </h2>
          {/* Order History Content */}
          <ul>
            <li>Order #1: Product A - $100</li>
            <li>Order #2: Product B - $200</li>
            <li>Order #3: Product C - $150</li>
            {/* Add more orders as needed */}
          </ul>
        </div>

        <div className="bg-white w-full p-5">
          <h2 className="text-lg font-bold mb-4 text-center text-yellow-800">
            Add a Review
          </h2>
          <label className="block mb-2">
            Review:
            <textarea className="block w-full mt-1"></textarea>
          </label>
          <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
