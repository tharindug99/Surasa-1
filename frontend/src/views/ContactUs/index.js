// frontend/src/views/ContactUsDetail/index.js

import React from 'react';
import { connect } from 'react-redux';
import { setContactUss } from 'redux/actions';
import ContactUsRequest from 'services/Requests/ContactUs';
import { useEffect } from 'react';
import useLoading from 'hooks/useLoading';

const ContactUsDetail = props => {
  const { setContactUss, contactUsMessages } = props; // Changed contactus to contactUsMessages
  const [loading, withLoading] = useLoading();

  const getAllContactUs = async () => { // New function for fetching all contact us data
    try {
      const contactUsMessages = await withLoading(ContactUsRequest.getAllContactUs()); // Use getAllContactUsData function
      setContactUss(contactUsMessages?.data);
      console.log(contactUsMessages?.data); // Console log the contact us data
    } catch (error) {
      console.log(error?.message);
      console.error(error);
    }
  }

  useEffect(() => {
    if(contactUsMessages?.length < 1){ // Fetch contact us data if not already fetched
      getAllContactUs();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {
        loading
          ? "Loading Contact Us Data"
          : <h4>Check console for contact us data</h4>
      }
    </>
  )
};

const mapStateToProps = ({contactUs}) => { // Add contactUs to mapStateToProps
  const { contactUsMessages } = contactUs; // Changed contactus to contactUsMessages
  return { contactUsMessages }
}

const mapDispatchToProps = {
  setContactUss // You need to create setContactUss action
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactUsDetail);