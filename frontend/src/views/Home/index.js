import React from "react";
import { useEffect } from "react";
import useLoading from "hooks/useLoading";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import Landing from "components/Landing/landing";
import Component02 from "components/Component 02/component02";
import About from "components/About/About";
import OrderMenu from "components/OrderMenu/OrderMenu";
import ContactUs from "components/Contact/Contact";

const Home = (props) => {
  const { title } = props;

  useDocumentTitle(title);

  return (
    <>
      <Landing />
      <OrderMenu />
      <About />
      {/* <Component02 /> */}
      {/* <ContactUs /> */}
    </>
  );
};

export default Home;
