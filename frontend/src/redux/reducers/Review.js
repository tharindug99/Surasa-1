import {SAVE_REVIEW, ADD_REVIEW, UPDATE_REVIEW, REMOVE_REVIEW, SAVE_REVIEWS} from "redux/constants/Review";


const initState = {
  reviews: [],
  currentReview: null,
};

const Review = (state = initState, action) => {
  switch (action.type) {
    case SAVE_REVIEW:
      return {
        ...state,
        reviews: action.payload,
      };
      case SAVE_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };

    case ADD_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
      };

    case UPDATE_REVIEW:
      const updatedReviews = state.reviews.map((review) =>
          review.id === action.payload.id ? action.payload : review
      );
      return {
        ...state,
        reviews: updatedReviews,
        currentReview: action.payload.id === state.currentReview?.id ? action.payload : state.currentReview,
      };

    case REMOVE_REVIEW:
      const filteredReviews = state.reviews.filter((review) => review.id !== action.payload.id);
      return {
        ...state,
        reviews: filteredReviews,
        currentReview: state.currentReview?.id === action.payload.id ? null : state.currentReview,
      };

    default:
      return state;
  }
};

export default Review;