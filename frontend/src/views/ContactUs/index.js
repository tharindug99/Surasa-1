import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setContactUss } from "redux/actions";
import ContactUsRequest from "services/Requests/ContactUs";
import useLoading from "hooks/useLoading";
import StickyHeadTable from "./ContactUsTableUI"; // Import your table component

const ContactUsDetail = (props) => {
  const { setContactUss, contactUsMessages } = props;
  const [loading, withLoading] = useLoading();

  const getAllContactUs = async () => {
    try {
      const contactUsResponse = await withLoading(
        ContactUsRequest.getAllContactUs()
      );
      setContactUss(contactUsResponse?.data);
    } catch (error) {
      console.log(error?.message);
      console.error(error);
    }
  };

  useEffect(() => {
    if (contactUsMessages?.length < 1) {
      getAllContactUs();
    }
  }, [contactUsMessages, getAllContactUs]);

  return (
    <>
      {loading ? (
        "Loading Contact Us Data"
      ) : (
        <StickyHeadTable rows={contactUsMessages} />
      )}
    </>
  );
};

const mapStateToProps = ({ contactUs }) => {
  const { contactUsMessages } = contactUs;
  return { contactUsMessages };
};

const mapDispatchToProps = {
  setContactUss,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactUsDetail);
