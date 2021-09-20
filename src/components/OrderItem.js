import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import CartItem from "./CartItem";
import Fonts from "../constants/Fonts";
import CustomButton from "./CustomButton";

const OrderItem = ({ orders }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <Text style={styles.infoText}>${orders.totalAmount.toFixed(2)}</Text>
        <Text style={styles.date}>{orders.readableDate}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          onPressHandler={() => setShowDetails((prevState) => !prevState)}
          color="#db5f12"
          label={showDetails ? "Hide details" : "View Details"}
        />
      </View>

      {showDetails && (
        <View style={styles.detailItems}>
          {orders.items.map((item) => (
            <CartItem key={item.productId} product={item} />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: "black",
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, heigh: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    margin: 20,
    padding: 15,
    borderRadius: 10,
  },
  infoText: {
    fontFamily: Fonts.lemonBold,
  },
  date: {
    fontFamily: Fonts.lemonRegular,
    color: "#888",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 5,
  },
  buttonContainer: {
    alignItems: "center",
    marginVertical: 15,
  },
  detailItems: {
    width: "100%",
  },
});

export default OrderItem;
