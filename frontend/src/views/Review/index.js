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
      // Correctly send an object as the payload
      const response = await withLoading(
        ReviewRequest.updateAReview(reviewId, { status })
      ); // Pass { status }

      // Assuming the API returns the updated review object in response.data or response.data.reviews
      // Based on your Postman, it's response.data.reviews
      if (response && response.data && response.data.reviews) {
        props.updateReview(response.data.reviews); // Pass the full updated review object to Redux
      } else if (response && response.data) {
        // Or if it's directly in response.data
        props.updateReview(response.data);
      } else {
        console.error(
          "Status update API call did not return the expected data."
        );
        // You might want to refetch all reviews here as a fallback
        // await getAllReviews();
      }
    } catch (error) {
      console.error("Status update failed:", error);
      // Optionally show a toaster message for the error
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
  }, []); // Empty dependency array to run only once

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
