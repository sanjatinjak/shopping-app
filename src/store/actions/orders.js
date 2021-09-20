import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const GET_ORDERS = "GET_ORDERS";

export const fetchOrders = () => {
  return async (dispatch) => {
    const response = await fetch(
      "https://shopping-app-151f4-default-rtdb.europe-west1.firebasedatabase.app/orders/u1.json"
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const data = await response.json();
    const loadedOrders = [];
    for (const key in data) {
      loadedOrders.push(
        new Order(
          key,
          data[key].cartItems,
          data[key].totalAmount,
          new Date(data[key].date)
        )
      );
    }

    dispatch({ type: GET_ORDERS, payload: loadedOrders });
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch) => {
    const date = new Date().toISOString();
    const response = await fetch(
      "https://shopping-app-151f4-default-rtdb.europe-west1.firebasedatabase.app/orders/u1.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const data = await response.json();

    dispatch({
      type: ADD_ORDER,
      payload: {
        id: data.name,
        items: cartItems,
        amount: totalAmount,
        date: date,
      },
    });
  };
};
