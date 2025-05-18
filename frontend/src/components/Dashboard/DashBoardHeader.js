import React, { useState } from "react";
import { BsJustify, BsBoxArrowRight } from "react-icons/bs";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

function DashBoardHeader({ OpenSidebar }) {
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const formatDate = () => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date().toLocaleDateString("en-US", options);
  };

  const handleLogout = () => {
    console.log("Admin logged out");
    setLogoutModalOpen(false);

    window.localStorage.removeItem("user");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userType");

    // Redirect to login page
    window.location.href = '/admin/login';

    // Alternatively: window.location.replace('/admin/login');
  };

  return (
    <header className="bg-white flex items-center justify-between h-12 px-4 shadow-md w-full z-50">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <div className="flex md:hidden">
          <BsJustify className="text-xl cursor-pointer" onClick={OpenSidebar} />
        </div>
        <div className="hidden md:flex md:items-center md:gap-4">
          {/* <span className="text-lg font-medium">Welcome back, User</span> */}
          <span className="text-lg font-medium">{formatDate()}</span>
        </div>
      </div>

      {/* Right side - Logout */}
      <div className="flex items-center gap-4">
        <BsBoxArrowRight
          className="text-xl cursor-pointer text-red-600 hover:text-red-800"
          onClick={() => setLogoutModalOpen(true)}
        />
      </div>

      {/* Logout Confirmation Modal */}
      <Dialog
        open={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        aria-labelledby="logout-dialog-title"
      >
        <DialogTitle id="logout-dialog-title" className="text-center">
          Confirm Logout
        </DialogTitle>
        <DialogContent>
          <p className="text-gray-600">Are you sure you want to log out?</p>
        </DialogContent>
        <DialogActions className="flex justify-center gap-4 mb-4">
          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
            className="px-6"
          >
            Logout
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setLogoutModalOpen(false)}
            className="px-6"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </header>
  );
}

export default DashBoardHeader;