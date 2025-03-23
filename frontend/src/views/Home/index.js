import React from "react";
import { useEffect } from "react";
import useLoading from "hooks/useLoading";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import Landing from "components/Landing/landing";
import Component02 from "components/Component 02/component02";
import About from "components/About/About";
import OrderMenu from "components/OrderMenu/OrderMenu";
import ContactUs from "components/Contact/Contact";
import Reviews from "components/Reviews/Reviews";
import Booking from "components/Booking/Booking";

const Home = (props) => {
  const { title } = props;

  useDocumentTitle(title);

  return (
    <>
      {/*<Landing />*/}
      {/*<OrderMenu />*/}
      <About />
      {/*<Booking />*/}
      {/*<Reviews />*/}
      {/*<ContactUs />*/}
    </>
  );
};

export default Home;
