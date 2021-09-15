import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

const Stack = createNativeStackNavigator();

function ShopNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: Colors.primary},
          headerTintColor: 'white'
        }}>
        <Stack.Screen
          name="ProductsOverview"
          component={ProductsOverviewScreen}
          options={{
            title: 'All products',
          }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{title: 'Product details'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ShopNavigator;
