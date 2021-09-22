import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Text } from "react-native";
import { useDispatch } from "react-redux";

import * as AuthActions from "../store/actions/auth";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";
import HomeScreen from "../screens/HomeScreen";

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
        name="Home"
        component={HomeScreen}
        options={{
          title: null,
        }}
      />
      <Stack.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={{ title: "All products" }}
        listeners={{
          beforeRemove: (e) => {
            e.preventDefault();
          },
        }}
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
      <Stack.Screen
        name="Authentication"
        component={AuthScreen}
        options={{ headerShown: false }}
      />
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

const CustomComponent = (props) => {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        icon={() => (
          <MaterialIcons name="shopping-cart" color="red" size={20} />
        )}
        activeTintColor="red"
        inactiveTintColor="red"
        labelStyle={{ fontFamily: Fonts.lemonBold }}
        label="Logout"
        onPress={() => {
          dispatch(AuthActions.logout());
          props.navigation.navigate("Auth");
        }}
      />
    </DrawerContentScrollView>
  );
};

function ShopNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Products"
        screenOptions={({ route }) => ({
          swipeEnabled: route.name === "Auth" ? false : true,
          headerShown: false,
          drawerLabelStyle: { fontFamily: Fonts.lemonBold },
        })}
        drawerContent={(props) => <CustomComponent {...props} />}
      >
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
