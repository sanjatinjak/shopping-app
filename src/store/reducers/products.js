import PRODUCTS from "../../data/dummy-data";
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
} from "../actions/products";
import Product from "../../models/product";

const initalState = {
  allProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === "u1"),
};

export default (state = initalState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      const id = action.payload;
      return {
        ...state,
        userProducts: state.userProducts.filter((product) => product.id !== id),
        allProducts: state.allProducts.filter((product) => product.id !== id),
      };
    case CREATE_PRODUCT:
      console.log(action.payload.price);
      console.log(typeof action.payload.price);
      const newProduct = new Product(
        new Date().toString(),
        "u1",
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
  }
  return state;
};
