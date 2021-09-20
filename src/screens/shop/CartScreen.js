import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import * as CartActions from "../../store/actions/cart";
import * as OrderActions from "../../store/actions/orders";
import CartItem from "../../components/CartItem";
import Fonts from "../../constants/Fonts";
import CustomButton from "../../components/CustomButton";
import DefaultStyle from "../../constants/DefaultStyle";
import Colors from "../../constants/Colors";

const CartScreen = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];

    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        title: state.cart.items[key].productTitle,
        price: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) => a.productId - b.productId);
  });

  const handleOrderSubmit = async () => {
    setIsLoading(true);
    await dispatch(OrderActions.addOrder(cartItems, cartTotalAmount));
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>
            ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        {isLoading ? (
          <View>
            <ActivityIndicator size="small" color={Colors.primary} />
          </View>
        ) : (
          <CustomButton
            onPressHandler={handleOrderSubmit}
            label="Order now"
            color={cartItems.length === 0 ? "gray" : "green"}
            disabled={cartItems.length === 0 ? true : false}
          />
        )}
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            deleteItem
            product={itemData.item}
            onRemove={() =>
              dispatch(CartActions.removeFromCart(itemData.item.productId))
            }
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, heigh: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
  },
  summaryText: {
    fontFamily: Fonts.lemonRegular,
    fontSize: 18,
  },
  amount: {
    fontFamily: Fonts.lemonBold,
  },
});

export default CartScreen;
