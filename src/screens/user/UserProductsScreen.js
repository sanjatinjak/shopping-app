import React, { useEffect } from "react";
import { FlatList, Alert, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import * as ProductActions from "../../store/actions/products";
import CustomHeaderButton from "../../components/HeaderButton";
import ProductItem from "../../components/ProductItem";
import Colors from "../../constants/Colors";
import DefaultStyle from "../../constants/DefaultStyle";
import CustomButton from "../../components/CustomButton";

const UserProductsScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

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
            title="Add"
            iconName="add-box"
            onPress={() => props.navigation.navigate("EditProduct")}
          />
        </HeaderButtons>
      ),
    });
  }, []);

  const deleteHandler = (id) => {
    Alert.alert("Are you sure ?", "Do you want to delete this item ?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => dispatch(ProductActions.deleteProduct(id)),
      },
    ]);
  };

  const onSelectHandler = (id) => {
    props.navigation.navigate("EditProduct", {
      productId: id,
    });
  };

  if (userProducts.length === 0) {
    return (
      <View style={DefaultStyle.spinner}>
        <Text>No products found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          product={itemData.item}
          onViewDetail={() => {}}
          onSelect={() => onSelectHandler(itemData.item.id)}
        >
          <CustomButton
            onPressHandler={() => onSelectHandler(itemData.item.id)}
            label="Edit"
            color={Colors.primary}
            width={100}
          />

          <CustomButton
            onPressHandler={() => deleteHandler(itemData.item.id)}
            label="Delete"
            color="red"
            width={100}
          />
        </ProductItem>
      )}
    />
  );
};

export default UserProductsScreen;
