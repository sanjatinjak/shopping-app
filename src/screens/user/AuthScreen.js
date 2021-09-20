import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";

import * as AuthActions from "../../store/actions/auth";
import Input from "../../components/Input";
import CustomButton from "../../components/CustomButton";

const LoginScreen = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const [signUp, setSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const regularExp = /\S+@\S+\.\S+/g;

  const handleEmail = (label, text) => {
    setEmailValid(regularExp.test(email));
    setEmail(text);
  };

  const handlePassword = (label, text) => {
    password.length < 6 ? setPasswordValid(false) : setPasswordValid(true);
    setPassword(text);
  };

  useEffect(() => {
    if (error) {
      Alert.alert("An error occcured !", error, [{ text: "Ok" }]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    if (signUp) {
      action = AuthActions.signUp(email, password);
    } else {
      action = AuthActions.logIn(email, password);
    }
    setError(null);
    setLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate("Products");
    } catch (error) {
      setError(error.message);
      
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView style={styles.screen}>
      <View style={styles.form}>
        <ScrollView>
          <Input
            label="email"
            required
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            errorText="Please enter valid email"
            onChangeHandler={handleEmail}
            isInputValid={emailValid}
          />
          <Input
            label="password"
            required
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeHandler={handlePassword}
            errorText="Please enter valid password"
            isInputValid={passwordValid}
          />

          <View style={styles.buttons}>
            {loading ? (
              <ActivityIndicator color="black" size="large" />
            ) : (
              <CustomButton
                label={signUp ? "Sign up" : "Login"}
                color="blue"
                width={250}
                onPressHandler={authHandler}
              />
            )}
          </View>
          <View style={styles.buttons}>
            <CustomButton
              label={`Switch to ${signUp ? "Login" : "Sign up"} `}
              width={250}
              color="orange"
              onPressHandler={() => setSignUp((prevState) => !prevState)}
            />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    shadowColor: "black",
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, heigh: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
    width: 320,
    maxHeight: 300,
    padding: 20,
  },
  buttons: {
    alignItems: "center",
    marginTop: 8,
  },
});

export default LoginScreen;
