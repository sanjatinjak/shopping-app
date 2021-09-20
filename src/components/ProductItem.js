import React from 'react';
import {View, Text, Button, Image, StyleSheet} from 'react-native';

import TouchableCmp from './TouchableCmp';
import Fonts from '../constants/Fonts';

const ProductItem = props => {
  const {product, onSelect} = props;
  return (
    <View style={styles.product}>
      <TouchableCmp onPress={onSelect} useForeground>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={{uri: product.imageUrl}} style={styles.image} />
          </View>
          <View style={styles.details}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          </View>
          <View style={styles.actions}>{props.children}</View>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: 'black',
    shadowOpacity: 0.6,
    shadowOffset: {width: 0, heigh: 2},
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    height: 300,
    margin: 20,
    borderRadius: 10,
  },
  container: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 18,
    marginVertical: 3,
    fontFamily: Fonts.lemonRegular,
  },
  price: {
    fontSize: 14,
    color: '#888',
    fontFamily: Fonts.lemonLight,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '25%',
    paddingHorizontal: 10,
  },
  details: {
    alignItems: 'center',
    height: '15%',
    padding: 5,
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
});

export default ProductItem;
