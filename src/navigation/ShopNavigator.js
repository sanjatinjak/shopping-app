import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";

import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const defaultStyle = {
  headerTitleAlign: "center",
  headerStyle: { backgroundColor: Colors.primary },
  headerTintColor: "white",
};

function OrdersNavigator() {
  return (
    <Stack.Navigator screenOptions={defaultStyle}>
      <Stack.Screen
        name="OrdersScreen"
        component={OrdersScreen}
        options={{ title: "My orders" }}
      />
    </Stack.Navigator>
  );
}

function ProductsNavigator() {
  return (
    <Stack.Navigator screenOptions={defaultStyle}>
      <Stack.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={{ title: "All products" }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: "Product details" }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: "My cart" }}
      />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={defaultStyle}>
      <Stack.Screen name="Authentication" component={AuthScreen} />
    </Stack.Navigator>
  );
}

function AdminNavigator() {
  return (
    <Stack.Navigator screenOptions={defaultStyle}>
      <Stack.Screen
        name="UserProductsScreen"
        component={UserProductsScreen}
        options={{ title: "My products" }}
      />
      <Stack.Screen name="EditProduct" component={EditProductScreen} />
    </Stack.Navigator>
  );
}

function ShopNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{ headerShown: false }}>
        <Drawer.Screen
          name="Products"
          component={ProductsNavigator}
          options={{
            drawerIcon: (drawerConfig) => (
              <MaterialIcons
                name="shopping-cart"
                color={drawerConfig.tintColor}
                size={20}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Orders"
          component={OrdersNavigator}
          options={{
            drawerIcon: (drawerConfig) => (
              <MaterialIcons
                name="list"
                color={drawerConfig.tintColor}
                size={20}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Admin"
          component={AdminNavigator}
          options={{
            drawerIcon: (drawerConfig) => (
              <MaterialIcons
                name="inventory"
                color={drawerConfig.tintColor}
                size={20}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Auth"
          component={AuthStack}
          options={{
            drawerIcon: (drawerConfig) => (
              <MaterialIcons
                name="settings"
                color={drawerConfig.tintColor}
                size={20}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default ShopNavigator;
