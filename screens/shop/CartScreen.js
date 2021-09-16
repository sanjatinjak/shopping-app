import React from 'react';
import {View, Text, FlatList, Button, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import * as CartActions from '../../store/actions/cart';
import CartItem from '../../components/CartItem';
import TouchableCmp from '../../components/TouchableCmp';
import DefaultStyle from '../../constants/DefaultStyle';
import Fonts from '../../constants/Fonts';

const CartScreen = props => {
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => {
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
    return transformedCartItems.sort((a,b) => a.productId-b.productId);
  });

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <TouchableCmp
          disabled={cartItems.length === 0 ? true : false}
          onPress={() => console.log('p')}>
          <View
            style={[
              DefaultStyle.button,
              {backgroundColor: cartItems.length === 0 ? 'gray' : 'green'},
            ]}>
            <Text style={DefaultStyle.buttonText}>Order now</Text>
          </View>
        </TouchableCmp>
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.productId}
        renderItem={itemData => (
          <CartItem
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.6,
    shadowOffset: {width: 0, heigh: 2},
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
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
