import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminProtectedRoute = ({ children }) => {
    // Example: get admin auth state from Redux or localStorage
    //const isAdminAuthenticated = useSelector((state) => state.admin?.isAuthenticated);

    // Or, if you use localStorage:
    const isAdminAuthenticated = localStorage.getItem("adminAuthToken");

    if (!isAdminAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }
    return children;
};

export default AdminProtectedRoute;