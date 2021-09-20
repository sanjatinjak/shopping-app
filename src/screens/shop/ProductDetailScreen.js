import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import * as CartActions from "../../store/actions/cart";
import Fonts from "../../constants/Fonts";
import Colors from "../../constants/Colors";

const ProductDetailScreen = ({ route, navigation }) => {
  const productId = route.params.productId;
  const selectedProduct = useSelector((state) =>
    state.products.allProducts.find((product) => product.id === productId)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({ title: selectedProduct.title });
  }, []);

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <CustomButton
          onPressHandler={() =>
            dispatch(CartActions.addToCart(selectedProduct))
          }
          color={Colors.primary}
          label="Add to cart"
        />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: Fonts.lemonBold,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: Fonts.lemonRegular,
  },
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
});

export default ProductDetailScreen;
