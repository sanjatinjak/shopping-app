import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  GET_PRODUCTS,
} from "../actions/products";
import Product from "../../models/product";

const initalState = {
  allProducts: [],
  userProducts: [],
};

export default (state = initalState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.payload.id,
        action.payload.ownerId,
        action.payload.title,
        action.payload.imageUrl,
        action.payload.description,
        action.payload.price
      );
      return {
        ...state,
        allProducts: state.allProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case GET_PRODUCTS:
      return {
        allProducts: action.allProducts,
        userProducts: action.userProducts,
      };

    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        (product) => product.id === action.pid
      );
      const updatedProduct = new Product(
        action.pid,
        state.userProducts[productIndex].ownerId,
        action.payload.title,
        action.payload.imageUrl,
        action.payload.description,
        state.userProducts[productIndex].price
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;

      const productIndexAll = state.allProducts.findIndex(
        (product) => product.id === action.pid
      );
      const updatedAllProducts = [...state.allProducts];
      updatedAllProducts[productIndexAll] = updatedProduct;

      return {
        ...state,
        allProducts: updatedAllProducts,
        userProducts: updatedUserProducts,
      };

    case DELETE_PRODUCT:
      const id = action.payload;
      return {
        ...state,
        userProducts: state.userProducts.filter((product) => product.id !== id),
        allProducts: state.allProducts.filter((product) => product.id !== id),
      };
  }
  return state;
};
