import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setReviews, updateReview } from "redux/actions";
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
      await withLoading(ReviewRequest.updateAReview(reviewId, status));
      props.updateReview(reviewId, status); // Use updateReview here
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
  updateReview: (reviewId, status) =>
    dispatch(updateReview(reviewId, status)) // Use updateReview here
});

export default connect(mapStateToProps, mapDispatchToProps)(Review);