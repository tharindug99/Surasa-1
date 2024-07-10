import React, { useState } from "react";
import DashBoardHeader from "../../components/Dashboard/DashBoardHeader";
import LeftNavBar from "../../components/Dashboard/LeftNavBar";
import DashboardHome from "./DashBoardHome";
import CustomerInfo from "../User/index"; //from here
import BookingRequests from "../Booking/index"; //from here
import DeliveryOrders from "../PlaceOrder/index"; //from here
import MenuItems from "../DailyMenuItem/index"; //from here
import ContactMsgs from "../ContactUs/index"; //from here
import ReviewApproval from "../Review/index"; //from here
// import SignOutScreen from '../screens/SignOutScreen';

function DashboardLayout() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("Home");

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "Home":
        return <DashboardHome />;
      case "Customer Info":
        return <CustomerInfo />;
      case "BookingRequests":
        return <BookingRequests />;
      case "Orders":
        return <DeliveryOrders />;
      case "MenuItems":
        return <MenuItems />;
      case "ContactMsgs":
        return <ContactMsgs />;
      case "ReviewApproval":
        return <ReviewApproval />;
      //   case "SignOut":
      //     return <SignOutScreen />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="mx-auto">
      <DashBoardHeader OpenSidebar={OpenSidebar} />
      <div className="flex h-screen">
        <LeftNavBar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
          setCurrentScreen={setCurrentScreen}
        />
        <div className="flex-1 bg-DeepBlue text-white p-4 overflow-auto">
          {renderScreen()}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
