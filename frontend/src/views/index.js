import React from 'react';
import { Route, Routes } from "react-router-dom";
import Landing from './Landing';
import NotFound from './Error/404';
import Header from 'components/shared/header';
import Chat from './Cart';
import PaymentSuccess from './Cart/Payment/successful';
import PaymentCancel from './Cart/Payment/cancel';
import Product from './Product';
import Category from './Category';
import { Button } from "@material-tailwind/react";

const Views = () => {
  return (
      <>
        <Header/>

          <Button>Button</Button>;

      </>
  );
}

export default Views;