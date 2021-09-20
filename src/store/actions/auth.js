export const SIGN_UP = "SIGN_UP";
export const LOG_IN = "LOG_IN";

export const signUp = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC6d7RxD1XGAdEnMpw_tR4Ooay4gZ6Nd-g",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      const errorId = errorData.error.message;
      let message = "Something went wrong.";
      if (errorId === "EMAIL_EXISTS") {
        message = "Email is already registered.";
      }
      throw new Error(message);
    }
    const data = await response.json();

    dispatch({ type: SIGN_UP, token: data.idToken, userId: data.localId });
  };
};

export const logIn = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC6d7RxD1XGAdEnMpw_tR4Ooay4gZ6Nd-g",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      const errorId = errorData.error.message;
      let message = "Something went wrong.";
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "Email could not be found.";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "Password is not valid.";
      }
      throw new Error(message);
    }
    const data = await response.json();
   
    dispatch({ type: LOG_IN, token: data.idToken, userId: data.localId });
  };
};
