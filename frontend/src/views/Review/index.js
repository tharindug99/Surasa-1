import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setReviews, updateReviewStatus } from "redux/actions"; // Add updateReviewStatus import
import ReviewRequest from "services/Requests/Review";
import useLoading from "hooks/useLoading";
import StickyHeadTable from "./ReviewTableUI";
import { useDispatch } from 'react-redux';
//     // eslint-disable-next-line react-hooks/exhaustive-deps

const Review = (props) => {
  const { setReviews, reviews, updateReviewStatus } = props;
  const [loading, withLoading] = useLoading();
  const dispatch = useDispatch();

  const getAllReviews = async () => {
    try {
      const reviewsResponse = await withLoading(ReviewRequest.getAllReviews());
      setReviews(reviewsResponse?.data);
    } catch (error) {
      console.log(error?.message);
    }
  };

  const handleStatusChange = async (reviewId, status) => {
    try {
      // Dispatch async action properly
      await dispatch(updateReviewStatus(reviewId, status));
    } catch (error) {
      console.error('Status update failed:', error);
    }
  };

  useEffect(() => {
    if (reviews?.length < 1) {
      getAllReviews();
    }
  }, [reviews, getAllReviews]);

  return (
    <>
      {loading ? "Loading Reviews" : (
        <StickyHeadTable
          rows={reviews}
          onStatusChange={handleStatusChange}
        />
      )}
    </>
  );
};

const mapStateToProps = ({ review }) => ({
  reviews: review.reviews || []
});

const mapDispatchToProps = {
  setReviews,
  updateReviewStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(Review);