import {
  SAVE_PRODUCTS,
  SAVE_PRODUCT,
  ADD_PRODUCT,
  UPDATE_PRODUCT, 
  REMOVE_PRODUCT
} from "redux/constants/Product";

const initState = {
  products: [],
  currentProduct: null,
};

const Product = (state = initState, action) => {
  switch (action.type) {
    case SAVE_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    case SAVE_PRODUCT:
      return {
        ...state,
        currentProduct: action.payload,
      };

    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case UPDATE_PRODUCT:
      const updatedProducts = state.products.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );
      return {
        ...state,
        products: updatedProducts,
        currentProduct: action.payload.id === state.currentProduct?.id ? action.payload : state.currentProduct,
      };

    case REMOVE_PRODUCT:
      const filteredProducts = state.products.filter((product) => product.id !== action.payload.id);
      return {
        ...state,
        products: filteredProducts,
        currentProduct: state.currentProduct?.id === action.payload.id ? null : state.currentProduct,
      };

    default:
      return state;
  }
};

export default Product;
