import { SAVE_REVIEWS, SAVE_REVIEW, ADD_REVIEW, UPDATE_REVIEW, REMOVE_REVIEW } from "redux/constants/Review";

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