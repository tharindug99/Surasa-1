import { SAVE_REVIEWS, SAVE_REVIEW, ADD_REVIEW, UPDATE_REVIEW, REMOVE_REVIEW, UPDATE_REVIEW_STATUS } from "redux/constants/Review";
import ReviewRequest from '../../services/Requests/Review';

export const setReviews = (payload) => {
  return {
    type: SAVE_REVIEWS,
    payload,
  };
};

export const setCurrentReview = (payload) => {
  return {
    type: SAVE_REVIEW,
    payload,
  };
};

export const addReview = (payload) => {
  return {
    type: ADD_REVIEW,
    payload,
  };
};

export const updateReview = (payload) => {
  return {
    type: UPDATE_REVIEW,
    payload,
  };
};

export const removeReview = (payload) => {
  return {
    type: REMOVE_REVIEW,
    payload,
  };
};

export const updateReviewStatus = (reviewId, status) => async (dispatch) => {
  try {
    const response = await ReviewRequest.updateAReview(reviewId, { status });

    dispatch({
      type: UPDATE_REVIEW_STATUS,
      payload: response.data
    });

    return { success: true, message: 'Status updated successfully' };
  } catch (error) {
    console.error('Update status failed:', error.response?.data);
    return {
      success: false,
      message: error.response?.data?.message || 'Status update failed'
    };
  }
};