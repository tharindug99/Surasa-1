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

  console.log("Sending to server:", {
    id: id,
    formData: [...productData.entries()] // Convert FormData to readable array
  });

  const formData = new FormData();

  formData.append('product.name', productData.name);
  formData.append('product.description', productData.description);
  formData.append('product.category_id', productData.category_id);
  formData.append('product.price', productData.price);


  if (productData.image) {
    formData.append('image', productData.avatar);
  }

  return fetch({
    url: `${product}/${id}`,
    method: "put",
    data: productData,
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
