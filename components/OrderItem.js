import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, FlatList} from 'react-native';

import CartItem from './CartItem';
import TouchableCmp from './TouchableCmp';
import Fonts from '../constants/Fonts';
import DefaultStyle from '../constants/DefaultStyle';

const OrderItem = ({orders}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <Text style={styles.infoText}>${orders.totalAmount.toFixed(2)}</Text>
        <Text style={styles.date}>{orders.readableDate}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableCmp onPress={() => setShowDetails(prevState => !prevState)}>
          <View
            style={[
              DefaultStyle.button,
              {width: '60%', backgroundColor: '#db5f12'},
            ]}>
            <Text style={DefaultStyle.buttonText}>
              {showDetails ? 'Hide details' : 'View Details'}
            </Text>
          </View>
        </TouchableCmp>
      </View>

      {showDetails && (
        <View style={styles.detailItems}>
          {orders.items.map(item => (
            <CartItem key={item.productId} product={item} />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: 'black',
    shadowOpacity: 0.6,
    shadowOffset: {width: 0, heigh: 2},
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    margin: 20,
    padding: 15,
    borderRadius: 10,

  },
  infoText: {
    fontFamily: Fonts.lemonBold,
  },
  date: {
    fontFamily: Fonts.lemonRegular,
    color: '#888',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 5
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  detailItems: {
    width: '100%',
  },
});

export default OrderItem;
