import fetch from "axiosConfig/FetchInterceptor";

const ReviewRequest = {};
const review = 'reviews';

ReviewRequest.addAReview = (data) => {
  return fetch({
    url: review,
    method: "post",
    data: data,
  });
};

ReviewRequest.getAllReviews = (params) => {
  return fetch({
    url: review,
    method: "get",
    params: params
  });
};

ReviewRequest.getAReview = (id) => {
  return fetch({
    url: `${review}/${id}`,
    method: "get"
  });
};

ReviewRequest.updateAReview = (params) => {
  return fetch({
    url: review,
    method: "put",
    params: params
  });
};

ReviewRequest.deleteAReview = (params) => {
  return fetch({
    url: review,
    method: "delete",
    params: params
  });
};

export default ReviewRequest;