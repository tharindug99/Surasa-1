import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Landing from "./Landing";
import NotFound from "./Error/404";
import Header from "components/shared/header/header";
import Footer from "components/shared/footer";
import Login from "./Login/login";
import Index from "./Register";
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
import AdminLogin from "./Admin/AdminLogin";
import ForgotAdminPassword from "./Admin/ForgotAdminPassword";

const Views = () => {
  const location = useLocation();

  const shouldRenderHeader = !location.pathname.startsWith("/admin/dashboard");
  const shouldRenderFooter = !location.pathname.startsWith("/admin/dashboard");

  return (
    <>
      {shouldRenderHeader && <Header />}

      <Routes>
        <Route path="/" element={<Home title="Home" />} />
        <Route path="/register" element={<Index />} />
        <Route path="/login" element={<Login />} />
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
        <Route path="/admin/dashboard" element={<DashBoard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/reset-password" element={<ForgotAdminPassword />} />
      </Routes>

      {shouldRenderFooter && <Footer />}
    </>
  );
};

export default Views;
