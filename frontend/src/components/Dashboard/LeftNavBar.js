import React, { useState } from "react";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";
import logo from "../../../src/assets/images/Surasa Logo.png";
import Component from "./Home/DailyMenuItems";

function LeftNavBar({ openSidebarToggle, OpenSidebar, setCurrentScreen }) {
  const [selectedItem, setSelectedItem] = useState("");

  const handleItemClick = (screen) => {
    setCurrentScreen(screen);
    setSelectedItem(screen);
  };

  const getItemClass = (screen) =>
    selectedItem === screen
      ? "p-4 bg-gray-700 text-yellow-500 cursor-pointer"
      : "p-4 hover:bg-gray-700 cursor-pointer";

  return (
    <aside
      className={`h-full bg-gray-800 overflow-y-auto transition-all duration-500 text-white ${
        openSidebarToggle ? "absolute z-20 w-64" : "hidden md:block md:w-64"
      }`}
    >
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <img className="h-20 w-20 rounded-lg" src={logo} />
        </div>
        <span
          className="text-red-500 text-lg cursor-pointer md:hidden"
          onClick={OpenSidebar}
        >
          X
        </span>
      </div>

      <ul className="list-none p-0">
        <li
          className={getItemClass("Home")}
          onClick={() => handleItemClick("Home")}
        >
          <a href="#" className="flex items-center">
            <BsGrid1X2Fill className="text-xl mr-3" /> Home
          </a>
        </li>
        <li
          className={getItemClass("Customer Info")}
          onClick={() => handleItemClick("Customer Info")}
        >
          <a href="#" className="flex items-center">
            <BsFillArchiveFill className="text-xl mr-3" /> Customer Info
          </a>
        </li>
        <li
          className={getItemClass("BookingRequests")}
          onClick={() => handleItemClick("BookingRequests")}
        >
          <a href="#" className="flex items-center">
            <BsFillGrid3X3GapFill className="text-xl mr-3" /> Booking Requests
          </a>
        </li>
        <li
          className={getItemClass("Orders")}
          onClick={() => handleItemClick("Orders")}
        >
          <a href="#" className="flex items-center">
            <BsPeopleFill className="text-xl mr-3" /> Orders
          </a>
        </li>
        <li
          className={getItemClass("MenuItems")}
          onClick={() => handleItemClick("MenuItems")}
        >
          <a href="#" className="flex items-center">
            <BsListCheck className="text-xl mr-3" /> MenuItems
          </a>
        </li>
        <li
          className={getItemClass("ContactMsgs")}
          onClick={() => handleItemClick("ContactMsgs")}
        >
          <a href="#" className="flex items-center">
            <BsMenuButtonWideFill className="text-xl mr-3" /> Messages
          </a>
        </li>
        <li
          className={getItemClass("ReviewApproval")}
          onClick={() => handleItemClick("ReviewApproval")}
        >
          <a href="#" className="flex items-center">
            <BsMenuButtonWideFill className="text-xl mr-3" /> Review Approval
          </a>
        </li>
        <li
          className={getItemClass("SignOut")}
          onClick={() => handleItemClick("SignOut")}
        >
          <a href="#" className="flex items-center">
            <BsFillGearFill className="text-xl mr-3" /> Sign Out
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default LeftNavBar;
