import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setReviews } from "redux/actions";
import ReviewRequest from "services/Requests/Review";
import useLoading from "hooks/useLoading";
import StickyHeadTable from "./ReviewTableUI"; // Import your table component

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

  useEffect(() => {
    if (reviews?.length < 1) {
      getAllReviews();
    }
  }, [reviews, getAllReviews]);

  return (
    <>{loading ? "Loading Reviews" : <StickyHeadTable rows={reviews} />}</>
  );
};

const mapStateToProps = ({ review }) => {
  const { reviews } = review;
  return { reviews };
};

const mapDispatchToProps = {
  setReviews,
};

export default connect(mapStateToProps, mapDispatchToProps)(Review);
