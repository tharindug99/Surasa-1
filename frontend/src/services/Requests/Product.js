import fetch from "axiosConfig/FetchInterceptor";

const ProductRequest = {};
const product = 'products';

ProductRequest.addAProduct = (data) => {
  return fetch({
    url: product,
    method: "post",
    data: data,
  });
};

ProductRequest.getAllProducts = (params) => {
  return fetch({
    url: product,
    method: "get",
    params: params
  });
};

ProductRequest.getAProduct = (id) => {
  return fetch({
    url: `${product}/${id}`,
    method: "get"
  });
};

ProductRequest.updateAProduct = (id, productData) => {
  return fetch(`${product}/${id}`, {
    method: "post", // Must be POST for FormData
    data: productData,
    headers: {
      'Accept': 'application/json',
    }
  });
};

ProductRequest.deleteAProduct = (id) => {
  return fetch({
    url: `${product}/${id}`,
    method: "delete"
  });
};

export default ProductRequest;
