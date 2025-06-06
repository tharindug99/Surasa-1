import fetch from "axiosConfig/FetchInterceptor";

const review = "reviews";

// Single declaration of ReviewRequest with all methods
const ReviewRequest = {
  addAReview: (data) => {
    return fetch({
      url: review,
      method: "post",
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  getAllReviews: (params) => {
    return fetch({
      url: review,
      method: "get",
      params: params,
    });
  },

  getAReview: (id) => {
    return fetch({
      url: `${review}/${id}`,
      method: "get",
    });
  },

  updateAReview: (id, data) => {
    return fetch({
      url: `${review}/${id}`,
      method: "put",
      data: data,
    });
  },

  deleteAReview: (id) => {
    return fetch({
      url: `${review}/${id}`,
      method: "delete",
    });
  },
};

export default ReviewRequest;