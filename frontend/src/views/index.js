import React from 'react';
import {Route, Routes} from "react-router-dom";
import Landing from './Landing';
import NotFound from './Error/404';
import Header from 'components/shared/header/header';
import Footer from 'components/shared/footer';
import Login from './Login/login';
import Register from './Register/register';
import Chat from './Cart';
import PaymentSuccess from './Cart/Payment/successful';
import PaymentCancel from './Cart/Payment/cancel';
import Product from './Product';
import Category from './Category';
import Home from './Home';


const Views = () => {

    return (
        <>
            <Header/>
            <div className="container my-5">
                <Routes>
                    <Route
                        path="/"
                        element={<Home title="Home"/>}
                    />
                    <Route
                        path="/register"
                        element={<Register/>}
                    />
                    <Route
                        path="/login"
                        element={<Login/>}
                    />
                    <Route
                        path="/product/:id"
                        element={<Product/>}
                    />
                    <Route
                        path="/category/:id"
                        element={<Category/>}
                    />
                    <Route
                        path="/landing"
                        element={<Landing/>}
                    />
                </Routes>
            </div>
            <Footer/>
        </>
    );
}

export default Views;