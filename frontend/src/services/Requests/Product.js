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

  // console.log("Sending to server:", {
  //   id: id,
  //   formData: [...productData.entries()] // Convert FormData to readable array
  // });


  // const formData = new FormData();

  // formData.append('name', productData.name);
  // formData.append('description', productData.description);
  // formData.append('category_id', productData.category_id);
  // formData.append('price', productData.price);

  const payload = {
    name: productData.name || "",
    description: productData.description || "",
    category_id: productData.category_id || "",
    price: productData.price || ""
  };

  if (productData.image) {
    payload.append('image', productData.avatar);
  }

  console.log("Payload from redux request: ", payload);
  console.log("productData from redux request: ", productData);

  return fetch({
    url: `${product}/${id}`,
    method: "put",
    data: productData
  });
};

ProductRequest.deleteAProduct = (id) => {
  return fetch({
    url: `${product}/${id}`,
    method: "delete"
  });
};

export default ProductRequest;
