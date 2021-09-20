import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
} from "react-native";

import Input from "../../components/Input";
import CustomButton from "../../components/CustomButton";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const regularExp = /\S+@\S+\.\S+/g;

  const handleEmail = (label, text) => {
    if (label === "email") {
      setEmailValid(regularExp.test(email));
      setEmail(text);
    }
  };

  const handlePassword = (label, text) => {
    password.length < 6 ? setPasswordValid(false) : setPasswordValid(true);
    setPassword(text);
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
            <CustomButton
              label="Log in"
              color="blue"
              onPressHandler={() => {}}
            />
          </View>
          <View style={styles.buttons}>
            <CustomButton
              label="Sign up"
              color="orange"
              onPressHandler={() => {}}
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
    width: 300,
    maxHeight: 300,
    padding: 20,
  },
  buttons: {
    alignItems: "center",
    marginTop: 5,
  },
});

export default LoginScreen;
