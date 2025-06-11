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

  // const handleStatusChange = async (reviewId, status) => {
  //   try {
  //     await withLoading(ReviewRequest.updateAReview(reviewId, status));
  //     props.updateReview(reviewId, status); // Use updateReview here
  //   } catch (error) {
  //     console.error('Status update failed:', error);
  //   }
  // };
  const handleStatusChange = async (reviewId, status) => {
    try {
      const response = await withLoading(
        ReviewRequest.updateAReview(reviewId, { status })
      );
      console.log("Status update response:", response);

      if (response && response.data && response.data.review) {
        props.updateReview(response.data.review);
      } else {
        console.error("Status update API call did not return the expected data.");
        await getAllReviews(); // Refetch all reviews as a fallback
      }
    } catch (error) {
      console.error("Status update failed:", error);
      console.error("Error details:", error.response ? error.response.data : error.message);
      console.error("Review ID:", reviewId);
      console.error("Status attempted:", status);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await ReviewRequest.deleteAReview(reviewId);
      await getAllReviews();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  useEffect(() => {
    if (reviews?.length < 1) getAllReviews();
  }, []);

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
  reviews: review.reviews || [],
});


const mapDispatchToProps = (dispatch) => ({
  setReviews: (reviews) => dispatch(setReviews(reviews)),
  updateReview: (updatedReviewObject) =>
    dispatch(updateReview(updatedReviewObject))
});

export default connect(mapStateToProps, mapDispatchToProps)(Review);
