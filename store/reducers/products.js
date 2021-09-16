import PRODUCTS from '../../data/dummy-data';
import {DELETE_PRODUCT} from '../actions/products';

const initalState = {
  allProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(product => product.ownerId === 'u1'),
};

export default (state = initalState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      const id = action.payload;
      return {
        ...state,
        userProducts: state.userProducts.filter(product => product.id !== id),
        allProducts: state.allProducts.filter(product => product.id !== id),
      };
  }
  return state;
};
