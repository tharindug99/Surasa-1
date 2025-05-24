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
  // Create FormData object
  const formData = new FormData();

  formData.append('name', productData.name);
  formData.append('description', productData.description);
  formData.append('category_id', productData.category_id);
  formData.append('price', productData.price);
  console.log("test", Array.isArray(productData.tags));

  if (productData.image) {
    formData.append('image', productData.avatar);
  }

  return fetch({
    url: `${product}/${id}`,
    method: "put",
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
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
