import React from "react";
import { Route, Routes } from "react-router-dom";
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
import OrderItem from "./OrderItem";
import PlaceOrder from "../views/PlaceOrder/index";

const Views = () => {
  return (
    <>
      <Header />
      <div className="container my-5">
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
          <Route path="/orderItem" element={<OrderItem />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default Views;
