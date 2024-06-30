import fetch from "axiosConfig/FetchInterceptor";

const ContactUsRequest = {};
const contactus = 'contactus';

ContactUsRequest.addAContactUs = (data) => {
  return fetch({
    url: contactus,
    method: "post",
    data: data,
  });
};

ContactUsRequest.getAllContactUs = (params) => {
  return fetch({
    url: contactus,
    method: "get",
    params: params
  });
};

ContactUsRequest.getAContactUs = (id) => {
  return fetch({
    url: `${contactus}/${id}`,
    method: "get"
  });
};

ContactUsRequest.updateAContactUs = (params) => {
  return fetch({
    url: contactus,
    method: "put",
    params: params
  });
};

ContactUsRequest.deleteAContactUs = (params) => {
  return fetch({
    url: contactus,
    method: "delete",
    params: params
  });
};

export default ContactUsRequest;