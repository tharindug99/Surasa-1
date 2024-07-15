import React, { useState } from "react";
import { Button } from "@mui/material";
import { deepYellow, yellow } from "@mui/material/colors";

function ForgotAdminPassword() {
  const [accessCode, setAccessCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log({
      accessCode,
      newPassword,
    });
    // Add logic to handle password reset
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-md shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Reset Your Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="access-code"
              className="block text-sm font-medium text-gray-700"
            >
              Access Code
            </label>
            <input
              type="text"
              name="access-code"
              id="access-code"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="new-password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              name="new-password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center justify-center">
            <Button
              disableElevation
              variant="contained"
              type="submit"
              sx={{
                bgcolor: yellow[700],
                width: "100%",
                "&:hover": {
                  bgcolor: "transparent",
                  borderWidth: 2,
                  borderColor: yellow[800],
                  color: yellow[800],
                },
              }}
            >
              Reset Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotAdminPassword;
