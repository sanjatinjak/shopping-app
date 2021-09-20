import { ADD_ORDER, GET_ORDERS } from "../actions/orders";
import Order from "../../models/order";

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        action.payload.id,
        action.payload.items,
        action.payload.amount,
        action.payload.date
      );

      return { ...state, orders: state.orders.concat(newOrder) };
    case GET_ORDERS:
      return { ...state, orders: action.payload };
  }

  return state;
};
