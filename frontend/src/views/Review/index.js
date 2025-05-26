import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setReviews, updateReviewStatus } from "redux/actions";
import ReviewRequest from "services/Requests/Review";
import useLoading from "hooks/useLoading";
import ReviewsTable from "./ReviewTableUI";

const Review = (props) => {
  const { setReviews, reviews } = props;
  const [loading, withLoading] = useLoading();

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
      // Call the API first
      await ReviewRequest.updateStatus(reviewId, status);
      // Then dispatch the Redux action
      props.updateReviewStatus(reviewId, status);
    } catch (error) {
      console.error('Status update failed:', error);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await ReviewRequest.deleteAReview(reviewId);
      await getAllReviews();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  useEffect(() => {
    if (reviews?.length < 1) getAllReviews();
  }, []); // Empty dependency array to run only once

  return (
    <>
      {loading ? "Loading Reviews" : (
        <ReviewsTable
          rows={reviews}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

const mapStateToProps = ({ review }) => ({
  reviews: review.reviews || []
});

const mapDispatchToProps = (dispatch) => ({
  setReviews: (reviews) => dispatch(setReviews(reviews)),
  updateReviewStatus: (reviewId, status) =>
    dispatch(updateReviewStatus(reviewId, status))
});

export default connect(mapStateToProps, mapDispatchToProps)(Review);