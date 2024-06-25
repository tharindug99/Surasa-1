import React from 'react';
import {Route, Routes} from "react-router-dom";
import Landing from './Landing';
import NotFound from './Error/404';
import Header from 'components/shared/header';
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
                </Routes>
            </div>
        </>
    );
}

export default Views;