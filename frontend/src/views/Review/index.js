import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setReviews, updateReviewStatus } from "redux/actions";
import ReviewRequest from "services/Requests/Review";
import useLoading from "hooks/useLoading";
import ReviewsTable from "./ReviewTableUI"; // Updated import

const Review = (props) => {
  const { setReviews, reviews, updateReviewStatus } = props;
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
      await updateReviewStatus(reviewId, status);
    } catch (error) {
      console.error('Status update failed:', error);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await ReviewRequest.deleteAReview(reviewId);
      await getAllReviews(); // Refresh the list after deletion
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  useEffect(() => {
    if (reviews?.length < 1) {
      getAllReviews();
    }
  }, [reviews]); // Removed getAllReviews from deps array

  return (
    <>
      {loading ? (
        "Loading Reviews"
      ) : (
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

const mapDispatchToProps = {
  setReviews,
  updateReviewStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(Review);