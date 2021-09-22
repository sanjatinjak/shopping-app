import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

import * as AuthActions from "../store/actions/auth";
import DefaultStyle from "../constants/DefaultStyle";

const HomeScreen = (props) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("@userData");
      if (!userData) {
        props.navigation.navigate("Auth");
        return;
      }
      const data = JSON.parse(userData);
      const { token, userId, expiryDate } = data;

      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate("Auth");
        return;
      }
      const expirationTime = expirationDate.getTime() - new Date().getTime();

      props.navigation.navigate("ProductsOverview");
      dispatch(AuthActions.authenticate(userId, token, expirationTime));
    };

    tryLogin();
  }, [dispatch, props.navigation]);

  return (
    <View style={DefaultStyle.spinner}>
      <ActivityIndicator color="black" size="large" />
    </View>
  );
};

export default HomeScreen;
