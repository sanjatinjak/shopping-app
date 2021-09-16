import {ADD_TO_CART, REMOVE_FROM_CART} from '../actions/cart';
import {ADD_ORDER} from '../actions/orders';
import CartItem from '../../models/cart-item';

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.payload;
      const {price, title} = addedProduct;
      let cartItem;
      if (state.items[addedProduct.id]) {
        cartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          price,
          title,
          state.items[addedProduct.id].sum + price,
        );
      } else {
        cartItem = new CartItem(1, price, title, price);
      }

      return {
        ...state,
        items: {...state.items, [addedProduct.id]: cartItem},
        totalAmount: state.totalAmount + price,
      };

    case REMOVE_FROM_CART:
      const id = action.payload;
      const selectedItem = state.items[id];
      const currentQty = selectedItem.quantity;

      let updatedCartItems;

      if (currentQty > 1) {
        const updatedCartItem = new CartItem(
          selectedItem.quantity - 1,
          selectedItem.productPrice,
          selectedItem.productTitle,
          selectedItem.sum - selectedItem.productPrice,
        );
        updatedCartItems = {...state.items, [id]: updatedCartItem};
      } else {
        updatedCartItems = {...state.items};
        delete updatedCartItems[id];
      }

      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedItem.productPrice,
      };

    case ADD_ORDER:
      return initialState;
  }
  return state;
};
