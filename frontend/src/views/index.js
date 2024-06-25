import React from 'react';
import {Route, Routes} from "react-router-dom";
import Landing from './Landing';
import NotFound from './Error/404';
import Header from 'components/shared/header/header';
import Footer from 'components/shared/footer';
import Chat from './Cart';
import PaymentSuccess from './Cart/Payment/successful';
import PaymentCancel from './Cart/Payment/cancel';
import Product from './Product';
import Category from './Category';


const Views = () => {

    return (
        <>
            <Header/>
            <div className="container my-5">
                <Routes>
                    <Route
                        path="/"
                        element={<Landing title="Landing Page"/>}
                    />
                    <Route
                        path="/register"
                        element={<Landing title="Landing Page"/>}
                    />
                    <Route
                        path="/login"
                        element={<Landing title="Landing Page"/>}
                    />
                </Routes>
            </div>
            <Footer/>
        </>
    );
}

export default Views;