import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const GET_PRODUCTS = "GET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://shopping-app-151f4-default-rtdb.europe-west1.firebasedatabase.app/products.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      const loadedProducts = [];

      for (const key in data) {
        loadedProducts.push(
          new Product(
            key,
            "u1",
            data[key].title,
            data[key].imageUrl,
            data[key].description,
            data[key].price
          )
        );
      }

      dispatch({ type: GET_PRODUCTS, payload: loadedProducts });
    } catch (error) {
      throw error;
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://shopping-app-151f4-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json`,
      { method: "DELETE" }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({ type: DELETE_PRODUCT, payload: id });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://shopping-app-151f4-default-rtdb.europe-west1.firebasedatabase.app/products.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, imageUrl, price }),
      }
    );

    const data = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      payload: { id: data.name, title, description, imageUrl, price },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://shopping-app-151f4-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, imageUrl }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      payload: { title, description, imageUrl },
    });
  };
};
