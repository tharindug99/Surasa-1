import React, { useState } from "react";
import Logo from "../../../src/assets/images/Surasa Logo.png";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { yellow } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import AdminRequest from "services/Requests/Admin";
import Toaster from "../../components/Toaster/Toaster";
import { loginAdmin } from "../../redux/actions"; // Ensure you have this action

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showToaster, setShowToaster] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");
  const [toasterType, setToasterType] = useState("error");

  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await AdminRequest.loginAdmin(formData);
      console.log(response);

      const loginData = response.data
      console.log("Login Data", loginData);

      const storageData = response.data.admin
      console.log("Storage Data", storageData);

      const { success, token, token_type, expires_in } = loginData;
      const { message, id, name } = storageData;



      if (success) {
        // Store authentication details
        localStorage.setItem('adminAuthToken', token);
        localStorage.setItem('adminTokenType', token_type);
        localStorage.setItem('adminId', id);
        localStorage.setItem('adminTokenExpiration', expires_in);

        // Dispatch to Redux store
        dispatch(loginAdmin({
          id,
          token,
          token_type,
          expires_in,
          name
        }));

        // Show success feedback
        setToasterType("success");
        setToasterMessage("Admin login successful!");
        setShowToaster(true);

        // Navigate to admin dashboard
        navigate("/admin/dashboard");
      } else {
        setToasterType("error");
        console.log("Success State:", typeof (success));
        setToasterMessage(message || "Login failed");
        setShowToaster(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      setToasterType("error");
      setToasterMessage(error.response?.data?.message || "An error occurred during login");
      setShowToaster(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-md shadow-lg">
        <div className="flex justify-center mb-8">
          <img src={Logo} alt="Logo" className="h-12 rounded-md" />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">
          Admin Portal 👋
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="name"
              name="name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember Me
              </label>
            </div>
            <div className="text-sm">
              <a
                href="/admin/reset-password"
                className="font-medium text-yellow-800 hover:text-yellow-700"
              >
                Forgot Password?
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Button
              type="submit"
              disableElevation
              variant="contained"
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
              Login
            </Button>
          </div>
        </form>
        {showToaster && (
          <Toaster
            message={toasterMessage}
            type={toasterType}
            onClose={() => setShowToaster(false)}
          />
        )}
      </div>
    </div>
  );
};

export default AdminLogin;