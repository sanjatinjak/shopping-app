import AsyncStorage from "@react-native-async-storage/async-storage";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOG_OUT = "LOG_OUT";

let timer;

export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId, token });
  };
};

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
    dispatch(
      authenticate(data.localId, data.idToken, parseInt(data.expiresIn) * 1000)
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(data.expiresIn) * 1000
    );
    saveData(data.idToken, data.localId, expirationDate);
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

    dispatch(
      authenticate(data.localId, data.idToken, parseInt(data.expiresIn) * 1000)
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(data.expiresIn) * 1000
    );
    saveData(data.idToken, data.localId, expirationDate);
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("@userData");
  return { type: LOG_OUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};
export const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveData = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "@userData",
    JSON.stringify({ token, userId, expiryDate: expirationDate.toISOString() })
  );
};
