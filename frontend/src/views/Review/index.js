// frontend/src/views/Review/index.js

import React from 'react';
import { connect } from 'react-redux';
import { setReviews } from 'redux/actions'; // You need to create setReviews action
import ReviewRequest from 'services/Requests/Review'; // You need to create ReviewRequest
import { useEffect } from 'react';
import useLoading from 'hooks/useLoading';

const Review = props => {
  const { setReviews, reviews } = props; // Add reviews to props
  const [loading, withLoading] = useLoading();

  const getAllReviews = async () => { // New function for fetching all reviews
    try {
      const reviews = await withLoading(ReviewRequest.getAllReviews()); // Use getAllReviews function
      setReviews(reviews?.data);
      console.log(reviews?.data); // Console log the reviews
    } catch (error) {
      console.log(error?.message);
      console.error(error);
    }
  }

  useEffect(() => {
    if(reviews?.length < 1){ // Fetch reviews if not already fetched
      getAllReviews();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {
        loading
          ? "Loading Reviews"
          : <h4>Check console for reviews data</h4>
      }
    </>
  )
};

const mapStateToProps = ({review}) => { // Add review to mapStateToProps
  const { reviews } = review; // You need to create review reducer
  return { reviews }
}

const mapDispatchToProps = {
  setReviews // You need to create setReviews action
}

export default connect(mapStateToProps, mapDispatchToProps)(Review);