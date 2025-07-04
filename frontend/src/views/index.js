import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Landing from "./Landing";
import NotFound from "./Error/404";
import Header from "components/shared/header/header";
import Footer from "components/shared/footer";
import Login from "./Login/login";
import Product from "./Product";
import Category from "./Category";
import Home from "./Home";
import Admin from "./Admin";
import Booking from "./Booking";
import ContactUs from "./ContactUs";
import DailyMenuItem from "./DailyMenuItem";
import Order from "./Order";
import Review from "./Review";
import User from "./User";
import UserDashboard from "./User/Dashboard/UserDashboard";
import OrderItem from "./OrderItem";
import PlaceOrder from "../views/PlaceOrder/index";
import DashBoard from "./Dashboard/index";
import { useState } from "react";
import AdminLogin from "./Admin/AdminLogin";
import ForgotAdminPassword from "./Admin/ForgotAdminPassword";

import AdminProtectedRoute from "components/Protected Routes/AdminProtectedRoutes";
import LoadingScreen from "./Loader/LoadingScreen";
import Register from "./Register";

const Views = () => {
  const location = useLocation();

  const shouldRenderHeader = !location.pathname.startsWith("/admin/dashboard");
  const shouldRenderFooter = !location.pathname.startsWith("/admin/dashboard");
  // const [isLoading, setIsLoading] = useState(true);
  // if (isLoading) {
  //   return <LoadingScreen />;
  // }
  // setIsLoading(false);

  return (
    <>
      {shouldRenderHeader && <Header />}

      <Routes>
        <Route path="/" element={<Home title="Surasa" />} />
        <Route path="/home" element={<Home title="Surasa" />} />
        <Route path="/register" element={<Register title="Register" />} />
        <Route path="/login" element={<Login title="Login" />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/dailyMenuItem" element={<DailyMenuItem />} />
        <Route path="/order" element={<Order />} />
        <Route path="/review" element={<Review />} />
        <Route path="/user" element={<User />} />
        <Route path="/user/:id/dashboard" element={<UserDashboard />} />
        <Route path="/orderItem" element={<OrderItem />} />



        <Route path="/admin/dashboard" element={<AdminProtectedRoute>
          <DashBoard />
        </AdminProtectedRoute>} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/reset-password" element={<ForgotAdminPassword />} />

        <Route path="*" element={<NotFound />} />

      </Routes>

      {shouldRenderFooter && <Footer />}
    </>
  );
};

export default Views;
