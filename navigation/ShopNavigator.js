import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import Colors from '../constants/Colors';

const Stack = createNativeStackNavigator();

function ShopNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ProductsOverview"
          component={ProductsOverviewScreen}
          options={{
            title:'All products', 
            headerTitleAlign: 'center',
            headerStyle: {backgroundColor: Colors.primary},
            headerTintColor: 'white',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ShopNavigator;
