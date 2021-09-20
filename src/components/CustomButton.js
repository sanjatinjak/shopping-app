import React from "react";
import { View, Text } from "react-native";

import TouchableCmp from "./TouchableCmp";
import DefaultStyle from "../constants/DefaultStyle";

export default CustomButton = (props) => {
  return (
    <TouchableCmp
      onPress={props.onPressHandler}
      disabled={props.disabled ? props.disabled : false}
    >
      <View
        style={{ ...DefaultStyle.button, ...{ backgroundColor: props.color } }}
      >
        <Text style={DefaultStyle.buttonText}>{props.label}</Text>
      </View>
    </TouchableCmp>
  );
};
