import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import TouchableCmp from './TouchableCmp';
import Fonts from '../constants/Fonts';

const CartItem = ({onRemove,product}) => {
  return (
    <View style={styles.cartItem}>
      <Text style={styles.itemData}>
        <Text style={styles.qty}>{product.quantity}</Text>{' '}
        <Text style={styles.mainText}>{product.title}</Text>
      </Text>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>${product.sum}</Text>
        <TouchableCmp onPress={onRemove} style={styles.deleteButton}>
          <MaterialIcons name="delete" size={26} color="red" />
        </TouchableCmp>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qty: {
      fontFamily: Fonts.lemonBold,
      fontSize: 16,
  },
  mainText: {
      fontFamily: Fonts.lemonRegular,
      fontSize: 16
  },
  deleteButton: {
    marginLeft: 20,
  },
});

export default CartItem;
