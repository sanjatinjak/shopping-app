import React, { useState, useEffect, useCallback } from "react";
import { FlatList, ActivityIndicator, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import DefaultStyle from "../../constants/DefaultStyle";
import * as ProductActions from "../../store/actions/products";
import * as CartActions from "../../store/actions/cart";
import ProductItem from "../../components/ProductItem";
import CustomHeaderButton from "../../components/HeaderButton";
import Colors from "../../constants/Colors";
import CustomButton from "../../components/CustomButton";

const ProductsOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const products = useSelector((state) => state.products.allProducts);
  const dispatch = useDispatch();

  const load = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(ProductActions.fetchProducts());
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Menu"
            iconName="menu"
            onPress={() => props.navigation.toggleDrawer()}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Cart"
            iconName="shopping-cart"
            onPress={() => props.navigation.navigate("Cart")}
          />
        </HeaderButtons>
      ),
    });
  }, []);

  const selectHandler = (id) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
    });
  };

  if (error) {
    <View style={DefaultStyle.spinner}>
      <Text> An error occured. </Text>
      <CustomButton label="Try again" onPressHandler={load} color="blue" />
    </View>;
  }

  if (isLoading) {
    return (
      <View style={DefaultStyle.spinner}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0 && !error) {
    return (
      <View style={DefaultStyle.spinner}>
        <Text> No products available. </Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={() => load}
      refreshing={isLoading}
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          product={itemData.item}
          onSelect={() => selectHandler(itemData.item.id)}
        >
          <CustomButton
            onPressHandler={() => selectHandler(itemData.item.id)}
            label="View Details"
            color="#db5f12"
          />

          <CustomButton
            onPressHandler={() =>
              dispatch(CartActions.addToCart(itemData.item))
            }
            label="Add to cart"
            color={Colors.primary}
          />
        </ProductItem>
      )}
    />
  );
};

export default ProductsOverviewScreen;
